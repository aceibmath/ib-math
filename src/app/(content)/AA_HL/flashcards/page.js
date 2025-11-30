// server component
export const metadata = {
  title: "IB Mathematics AA HL — Flashcards",
};

import PageHeader from "@/components/ui/PageHeader";
import FlashcardsTitleCard from "@/components/flashcards/FlashcardsTitleCard";
import FlashcardsSelectorHL from "@/components/flashcards/FlashcardsSelector-aa-hl";

export default function Page() {
  return (
    <PageHeader>
      <FlashcardsTitleCard course="AA HL" theme="aa-hl" />

      {/* 👇 wrapper global de temă – important pentru override-uri */}
      <div className="course-theme-aa-hl">
        <section
          className="rounded-3xl border border-slate-200 bg-white shadow-sm"
          style={{ minHeight: 420 }}
        >
          <FlashcardsSelectorHL />
        </section>
      </div>
    </PageHeader>
  );
}
