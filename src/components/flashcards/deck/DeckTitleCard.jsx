"use client";
import React from "react";
import styles from "./deck.module.css";

export default function DeckTitleCard({ topic, subtopic }) {
  return (
    <div className={styles.titleCard}>
      <h1 className={styles.titleHeading}>IB Mathematics AA SL — Flashcards</h1>
      <p className={styles.titleSub}>Start: <strong>{topic || "—"}</strong> — <strong>{subtopic || "—"}</strong></p>
    </div>
  );
}
