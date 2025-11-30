// src/app/layout.js
import "./globals.css";
import "katex/dist/katex.min.css"; // CSS KaTeX (LaTeX)

import { Inter } from "next/font/google";
import Providers from "./providers";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TutorWidget from "../components/TutorWidget";

// next/font — self-hosted, fără CLS
const inter = Inter({
  subsets: ["latin"],
  display: "swap",              // nu blochează paintul
  adjustFontFallback: true,     // metrica fallback → mai puțin „salt”
  fallback: ["system-ui", "Segoe UI", "Roboto", "Arial"],
  variable: "--font-inter",     // expune variabila CSS pt. folosire în stylesheet
});

export const metadata = {
  title: "AceIBMath",
  description: "IB Mathematics resources",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-stable">
      {/* Dacă vrei și preload la fonturile KaTeX, le putem adăuga ulterior
          după ce le copiezi în /public/katex/. Păstrăm minimal și stabil acum. */}
      <body className={`${inter.className} ${inter.variable}`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          {/* Tutor montat global. Se deschide la evenimentul `ace:tutor-open` */}
          <TutorWidget showFab={false} />
        </Providers>
      </body>
    </html>
  );
}
