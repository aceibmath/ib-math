/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  // păstrăm Bootstrap, deci nu lăsăm Tailwind să facă reset
  corePlugins: { preflight: false },
  theme: {
    extend: {
      // aceeași lățime ca la Questionbank
      maxWidth: { page: "1280px" },

      // ✅ culori custom
      colors: {
        brand: { 600: "#0f6a75" },            // existent
        "brand-red": "var(--brand-red)",      // ← grena global: #7A1F2A (definit în globals.css)
        ink: "#0f3d37",                        // verde-închis/albăstrui folosit frecvent
        // opțional: câteva nuanțe “warm gray” dacă vrei utilitare directe
        warmgray: {
          50:  "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
        },
      },

      borderRadius: { xl: "18px" },
      boxShadow: {
        soft: "0 1px 3px rgba(2,8,23,.06), 0 8px 24px rgba(2,8,23,.06)",
      },
      keyframes: {
        tap: {
          "0%,100%": { transform: "translateY(0)" },
          "45%": { transform: "translateY(1.5px)" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(0deg)" },
          "40%": { transform: "rotate(-0.6deg)" },
          "60%": { transform: "rotate(0.6deg)" },
        },
      },
      animation: {
        tap: "tap 130ms ease-out",
        wiggle: "wiggle 200ms ease-in-out",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
