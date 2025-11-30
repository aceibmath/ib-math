// server component
export const metadata = { title: "IB Mathematics AI HL — Flashcards" };

import PageHeader from "@/components/ui/PageHeader";
import FlashcardsTitleCard from "@/components/flashcards/FlashcardsTitleCard";
import FlashcardsSelectorAIHL from "@/components/flashcards/FlashcardsSelector-ai-hl";

export default function Page() {
  return (
    <PageHeader>
      <FlashcardsTitleCard course="AI HL" theme="ai-hl" />


      <section
        className="rounded-3xl border border-slate-200 bg-white shadow-sm"
        style={{ minHeight: 420 }}
      >
        <FlashcardsSelectorAIHL />
      </section>
    </PageHeader>
  );
}
