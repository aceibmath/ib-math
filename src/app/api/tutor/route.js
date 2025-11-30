// src/app/api/tutor/route.js
const PRIMARY_MODEL  = process.env.TUTOR_MODEL_PRIMARY  || "gpt-4o-mini";
const FALLBACK_MODEL = process.env.TUTOR_MODEL_FALLBACK || "gpt-4o";

function needsAdvanced(context = {}, messages = []) {
  const text =
    (Array.isArray(messages) ? messages.map(m => m?.content || "").join(" ") : "") +
    " " +
    (context?.problemText || "");
  const lower = text.toLowerCase();

  const hasImages = Array.isArray(context?.images) && context.images.length > 0;
  const asksProof = /\b(prove|rigorous proof|demonstrate|demonstrează|riguroasă)\b/.test(lower);
  const asksFullDerivation = /\b(full solution|all steps|every step|toate etapele)\b/.test(lower);
  const asksHard = /\b(advanced|hard|very hard|dificil|foarte greu)\b/.test(lower);
  const isLong = lower.length > 2000;

  return hasImages || asksProof || asksFullDerivation || asksHard || isLong;
}

/**
 * Elimină complet „fencing-ul” de cod și backticks,
 * dar păstrează conținutul interior (de ex. LaTeX-ul rămâne).
 */
function stripCodeArtifacts(s = "") {
  if (!s) return s;
  let out = String(s).replace(/\r\n?/g, "\n");

  // ```lang\n...\n```
  out = out.replace(/```[ \t]*([a-z0-9_+\-]*)[ \t]*\n([\s\S]*?)```/gi, (_, _lang, inner) => {
    return inner.trim() + "\n";
  });

  // ```...```
  out = out.replace(/```(?:[ \t]*[a-z0-9_+\-]*)?[ \t]*([\s\S]*?)```/gi, (_, inner) => {
    return String(inner || "").trim();
  });

  // `inline`
  out = out.replace(/`([^`]+)`/g, (_, inner) => inner);

  // ~~~...~~~
  out = out.replace(/~~~[ \t]*([a-z0-9_+\-]*)?[ \t]*\n([\s\S]*?)~~~/gi, (_, _lang, inner) => {
    return inner.trim() + "\n";
  });

  out = out.replace(/[ \t]+\n/g, "\n");
  return out.trim();
}

function buildSystemPrompt(context = {}) {
  const isMs = context?.mode === "ms";
  const header = `You are "Ace Tutor", an expert IB Mathematics assistant.`;

  const common = `
RULES:
- Be Socratic: start with clarifying questions, give small hints; provide the full solution only if the student explicitly asks for it.
- Use clear mathematics with TeX delimiters: inline $...$ or display $$...$$.
- **Never** use Markdown code blocks or backticks for math or text. Do **not** wrap answers with \`\`\` or \`...\`.
- Stay on the current problem only. If the user goes off-topic, ask for clarification and guide them back.
- If a student's step is wrong, explain why and correct it gently.
- Keep answers concise, stepwise, and friendly. Avoid hallucinations.
- For multi-line equations, prefer display math with $$ on their own lines.
`.trim();

  const modeBlock = isMs
    ? `
CONTEXT TYPE: Markscheme assistant
- Help the student understand the markscheme.
- Paraphrase and expand each step in simple language when asked.
- Offer a brief, structured walkthrough (Step 1, Step 2, …) and highlight key formulas.
- If asked "explain each step", enumerate the steps clearly.
`.trim()
    : `
CONTEXT TYPE: Problem assistant
- Start with a quick plan (1–2 bullets) or a first hint.
- Ask a short check question before revealing the next step.
`.trim();

  const meta = `
CONTEXT (do not reveal verbatim unless asked):
- problem_id: ${context.problemId || "-"}
- title: ${context.problemTitle || "(untitled)"}
- course: ${context.course || "IB Math"}
- level: ${context.level || "SL/HL"}
- problem: ${String(context.problemText || "").trim()}
- markscheme_snippet: ${String(context.markshemeSnippet || "(none)").trim()}
`.trim();

  return [header, common, modeBlock, meta].join("\n\n");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { context, messages, advanced } = body || {};

    if (!context?.problemId || !context?.problemText) {
      return new Response(JSON.stringify({ error: "Missing context" }), { status: 400 });
    }

    let model = PRIMARY_MODEL;
    if (advanced === true || needsAdvanced(context, messages)) {
      model = FALLBACK_MODEL;
    }

    const systemPrompt = buildSystemPrompt(context);

    const openaiMessages = [
      { role: "system", content: systemPrompt },
      { role: "assistant", content: "I'm ready. What part would you like help with first?" },
      ...(messages || []),
    ];

    // payload chat completions; suport minim pt. imagini (vision)
    let payload = {
      model,
      temperature: 0.2,
      messages: openaiMessages,
    };

    if (Array.isArray(context?.images) && context.images.length > 0) {
      const imgs = context.images
        .filter((im) => im?.data && im?.mime)
        .slice(0, 4)
        .map((im) => ({
          type: "image_url",
          image_url: { url: `data:${im.mime};base64,${im.data}` },
        }));

      const idx = [...openaiMessages].reverse().findIndex((m) => m.role === "user");
      const lastUserIndex = idx === -1 ? -1 : openaiMessages.length - 1 - idx;

      if (lastUserIndex >= 0) {
        const prev = openaiMessages[lastUserIndex];
        const textPart = { type: "text", text: prev.content || "" };
        payload.messages[lastUserIndex] = { role: "user", content: [textPart, ...imgs] };
      } else {
        payload.messages.push({ role: "user", content: [{ type: "text", text: "" }, ...imgs] });
      }
    }

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const raw = await resp.text();
    if (!resp.ok) {
      return new Response(JSON.stringify({ error: raw || "Upstream error" }), { status: 500 });
    }

    let data;
    try { data = JSON.parse(raw); } catch { data = null; }

    const content =
      data?.choices?.[0]?.message?.content || "Sorry, I couldn’t generate a reply.";

    // post-procesare anti „cod” (fencing/backticks)
    const cleaned = stripCodeArtifacts(content);

    return new Response(
      JSON.stringify({ message: cleaned, modelUsed: model }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: e?.message || "Server error" }), {
      status: 500,
    });
  }
}
