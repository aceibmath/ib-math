// src/app/layout.js
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../context/AuthContext";
import Header from "../components/Header";
import "./globals.css";

// ✅ varianta recomandată Next.js (apare ca <meta name="google-site-verification" ...>)
export const metadata = {
  title: "AceIBMath",
  description: "AceIBMath platform",
  verification: {
    google: "c5I3bYFM80ZLuFGf36juGVilyeSjFWFPCKbx6SiLMKk",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ redundanță: meta explicit, ca să fim siguri că e injectat pe toate paginile */}
        <meta
          name="google-site-verification"
          content="c5I3bYFM80ZLuFGf36juGVilyeSjFWFPCKbx6SiLMKk"
        />
      </head>
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
