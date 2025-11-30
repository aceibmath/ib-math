// src/app/(content)/AA_SL/flashcards/deck/[topic]/[subtopic]/page.js
import { notFound } from "next/navigation";
import { getDeckFor } from "@/data/flashcards/aa-sl/registry";
// ajustează în funcție de componenta ta client care rulează deck-ul:
import DeckRunner from "@/components/flashcards/deck/DeckRunner";

export default function Page({ params }) {
  const { topic, subtopic } = params;
  const deck = getDeckFor(topic, subtopic);
  if (!deck) return notFound();

  return (
    <DeckRunner
      title={deck.title}
      topicTitle={deck.topicTitle}
      questions={deck.questions}
      meta={deck.meta}
    />
  );
}
