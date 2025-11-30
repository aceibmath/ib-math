// server component
export const metadata = { title: "IB Mathematics AI SL — Flashcards" };

import PageHeader from "@/components/ui/PageHeader";
import FlashcardsTitleCard from "@/components/flashcards/FlashcardsTitleCard";
import FlashcardsSelectorAISL from "@/components/flashcards/FlashcardsSelector-ai-sl";

export default function Page() {
  return (
    <PageHeader>
      <FlashcardsTitleCard course="AI SL" theme="ai-sl" />

      {/* wrapper de temă pentru AI SL */}
      <div className="course-theme-ai-sl">
        {/* Cadru cu min-height ca să țină footer-ul jos încă din start */}
        <section
          className="rounded-3xl border border-slate-200 bg-white shadow-sm"
          style={{ minHeight: 420 }}
        >
          <FlashcardsSelectorAISL />
        </section>
      </div>
    </PageHeader>
  );
}
