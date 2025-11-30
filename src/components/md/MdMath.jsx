// src/components/md/MdMath.jsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";

function normalizeMathpix(source) {
  let s = String(source ?? "");

  s = s.replace(/\\\[/g, "$$").replace(/\\\]/g, "$$");
  s = s.replace(/\\\((.+?)\\\)/gs, "$$$1$");
  s = s.replace(
    /\\begin\{equation\*?\}([\s\S]*?)\\end\{equation\*?\}/g,
    "$$$1$$"
  );
  s = s.replace(
    /\\begin\{align\*?\}([\s\S]*?)\\end\{align\*?\}/g,
    "$$\\begin{aligned}$1\\end{aligned}$$"
  );

  return s;
}

export default function MdMath({ children, className }) {
  const raw =
    Array.isArray(children) ? children.join("") : String(children ?? "");
  const source = normalizeMathpix(raw);

  // >>> KaTeX options – AICI e partea importantă
  const katexOptions = {
    throwOnError: false,
    strict: "warn",
    // permitem funcțiile HTML helpers (pentru macro-ul nostru)
    trust: (context) =>
      ["\\htmlClass", "\\htmlStyle"].includes(context.command),
    macros: {
      // \hl{...} => <span class="ace-hl-math">...</span>
      "\\hl": "\\htmlClass{ace-hl-math}{#1}",
      // dacă vrei și o variantă de „boxed + highlight”:
      "\\hlbox": "\\htmlClass{ace-hl-math-box}{#1}",
    },
  };

  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeKatex, katexOptions], // pasăm opțiunile aici
        ]}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
