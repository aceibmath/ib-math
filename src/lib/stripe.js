// src/lib/stripe.js
import Stripe from "stripe";

const API_VERSION = "2024-06-20";

// Singleton Stripe instance (survives Next.js HMR in dev)
const globalForStripe = globalThis;

export const stripe =
  globalForStripe._stripe ||
  new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: API_VERSION });

if (!globalForStripe._stripe) {
  globalForStripe._stripe = stripe;
}

// Optional: warn if key missing in dev
if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV !== "production") {
  console.warn("[stripe] STRIPE_SECRET_KEY is not set. Stripe API calls will fail in dev.");
}
