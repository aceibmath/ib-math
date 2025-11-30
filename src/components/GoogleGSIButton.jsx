import { useEffect, useRef } from "react";
import { auth } from "@/firebase/config"; // ajustează calea dacă nu ai alias "@"
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

export default function GoogleGSIButton({ onSuccess, onError }) {
  const btnRef = useRef(null);

  useEffect(() => {
    const scriptId = "gsi-client";

    const init = () => {
      const ga = window.google?.accounts?.id;
      if (!ga) return;

      ga.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        ux_mode: "popup", // sau "redirect" dacă preferi
        callback: async (response) => {
          try {
            const cred = GoogleAuthProvider.credential(response.credential);
            const userCred = await signInWithCredential(auth, cred);
            onSuccess?.(userCred);
          } catch (e) {
            console.error("GSI -> Firebase sign-in error:", e);
            onError?.(e);
          }
        },
      });

      ga.renderButton(btnRef.current, {
        theme: "outline",
        size: "large",
        text: "signin_with", // sau "continue_with"
        shape: "rectangular",
        width: 260,
      });
    };

    if (!document.getElementById(scriptId)) {
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://accounts.google.com/gsi/client";
      s.async = true;
      s.defer = true;
      s.onload = init;
      document.head.appendChild(s);
    } else {
      init();
    }
  }, []);

  return <div ref={btnRef} />;
}
