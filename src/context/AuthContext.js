"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGIN CU GOOGLE – redirect în aceeași filă (fără pop-up)
  const loginWithGoogle = async () => {
    try {
      googleProvider.setCustomParameters({ prompt: "select_account" });
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Google sign-in error:", error?.code || error);
      throw error;
    }
  };

  // LOGIN CU EMAIL
  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return { success: false, error: "User not found" };
      }
      if (error.code === "auth/wrong-password") {
        return { success: false, error: "Incorrect password" };
      }
      return { success: false, error: "Login failed" };
    }
  };

  // REGISTER CU EMAIL
  const registerWithEmail = async (email, password, firstName, lastName) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: `${firstName} ${lastName}`
      });

      await sendEmailVerification(res.user, {
        url: "http://localhost:3000/email-verified"
      });

      return { success: true };
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        return { success: false, error: "email-already-in-use" };
      }
      return { success: false, error: "register-failed" };
    }
  };

  // RESET PASSWORD
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:3000/login"
      });
      return { success: true };
    } catch (error) {
      console.error("Reset password error:", error.code);
      return { success: false, error: error.code };
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await signOut(auth);
    } finally {
      try {
        await fetch("/api/session/clear", {
          method: "POST",
          credentials: "include",
        });
      } catch (_) {}
      window.location.href = "/";
    }
  };

  // LISTEN PENTRU USER LOGIN
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        logout,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
