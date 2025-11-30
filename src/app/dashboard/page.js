// src/app/dashboard/page.js
"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
// asigură inițializarea app-ului Firebase (client)
import "../../lib/firebase";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [accessLoading, setAccessLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  // dacă nu ești logat, mergi la login
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // verifică accesul în Firestore (users/{uid}.hasAccess)
  useEffect(() => {
    const checkAccess = async () => {
      if (loading || !user) return;
      try {
        const db = getFirestore();
        const snap = await getDoc(doc(db, "users", user.uid));
        const granted = snap.exists() && snap.data()?.hasAccess === true;
        setHasAccess(granted);
        if (!granted) {
          router.push("/membership"); // fără acces → mergi la membership
        }
      } catch (e) {
        console.error("Access check failed:", e);
        router.push("/membership");
      } finally {
        setAccessLoading(false);
      }
    };
    checkAccess();
  }, [loading, user, router]);

  // spinnere cât timp verificăm auth + access
  if (loading || accessLoading) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  // fallback
  if (!user) return null;
  if (!hasAccess) return null; // deja redirecționat

  // acces acordat → dashboard
  return (
    <div className="container py-5">
      <h1 className="mb-4">Welcome to your Dashboard</h1>

      <div className="card p-4 shadow-sm mb-4">
        <p>
          <strong>Name:</strong> {user.displayName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <button onClick={logout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
}
