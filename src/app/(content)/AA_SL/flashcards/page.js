// server component
export const metadata = {
  title: "IB Mathematics AA SL — Flashcards",
};

import PageHeader from "@/components/ui/PageHeader";
import FlashcardsTitleCard from "@/components/flashcards/FlashcardsTitleCard";
import FlashcardsSelectorAASL from "@/components/flashcards/FlashcardsSelector-aa-sl";

export default function Page() {
  return (
    <PageHeader>
     <FlashcardsTitleCard course="AA SL" theme="aa-sl" />


      {/* Cadru cu min-height ca să țină footer-ul jos încă din start */}
      <section
        className="rounded-3xl border border-slate-200 bg-white shadow-sm"
        style={{ minHeight: 420 }}
      >
        <FlashcardsSelectorAASL />
      </section>
    </PageHeader>
  );
}
