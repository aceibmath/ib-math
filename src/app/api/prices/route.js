// src/app/api/prices/route.js
import { stripe } from "../../../lib/stripe";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseLookupKey(lk) {
  // ex: "aa_sl_12m" -> { base:"aa_sl", months:12 }
  const m = String(lk || "").match(/^([a-z_]+)_(\d{1,2})m$/i);
  if (!m) return null;
  return { base: m[1], months: parseInt(m[2], 10) };
}

async function readPricingTable() {
  try {
    const p = path.join(process.cwd(), "public", "pricing-table.json");
    const raw = await fs.readFile(p, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function POST(req) {
  try {
    let { lookupKeys } = await req.json();

    // Acceptă string sau array
    if (typeof lookupKeys === "string") lookupKeys = [lookupKeys];
    if (!Array.isArray(lookupKeys) || lookupKeys.length === 0) {
      return new Response(JSON.stringify({ error: "lookupKeys is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Dedupe + limită (Stripe permite până la 100)
    const keys = Array.from(new Set(lookupKeys)).slice(0, 100);

    // 1) Încearcă să servești din JSON (rapid, fără Stripe)
    const table = await readPricingTable();
    const out = {};
    const notFound = [];

    if (table?.prices && table?.meta?.currency) {
      for (const lk of keys) {
        const parsed = parseLookupKey(lk);
        if (!parsed) {
          notFound.push(lk);
          continue;
        }
        const { base, months } = parsed;
        const row =
          table.prices?.[base] && table.prices?.[base]?.[String(months)];
        if (row && typeof row.total_cents === "number") {
          out[lk] = {
            id: null, // nu avem un Stripe Price fix pentru lunile intermediare
            lookup_key: lk,
            unit_amount: row.total_cents,
            currency: table.meta.currency || "eur",
            product_id: undefined,
            product_name: undefined,
          };
        } else {
          notFound.push(lk);
        }
      }
    } else {
      // dacă n-ai JSON, toate merg la fallback Stripe
      notFound.push(...keys);
    }

    // 2) Pentru cele care lipsesc în JSON → fallback la Stripe (ex. 1/12/24 sau chei non-standard)
    if (notFound.length) {
      const list = await stripe.prices.list({
        lookup_keys: notFound,
        active: true,
        expand: ["data.product"],
        limit: notFound.length,
      });

      for (const p of list.data) {
        out[p.lookup_key] = {
          id: p.id,
          lookup_key: p.lookup_key,
          unit_amount: p.unit_amount,
          currency: p.currency,
          product_id: typeof p.product === "string" ? p.product : p.product?.id,
          product_name:
            typeof p.product === "object" ? p.product?.name : undefined,
        };
      }

      // Marchează cheile rămase lipsă ca null
      for (const k of notFound) {
        if (!(k in out)) out[k] = null;
      }
    }

    return new Response(JSON.stringify({ prices: out }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[api/prices] error:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch prices" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
