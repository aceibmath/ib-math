// src/app/(content)/AI_HL/questionbank/page.js
export const dynamic = "force-dynamic";

import PageHeader from "@/components/ui/PageHeader";
import QuestionbankTitleCard from "@/components/questionbank/QuestionbankTitleCard";
import { SUBTOPICS_AIHL } from "@/data/questionbank/ai-hl-subtopics";
import QuestionbankClientAIHL from "@/app/(content)/AI_HL/questionbank/QuestionbankClientAIHL";

export const metadata = { title: "Questionbank — AI HL" };

export default function Page() {
  return (
    <PageHeader>
      {/* dacă theme="ai-hl" încă nu există în QuestionbankTitleCard,
         pune temporar "ai-sl" ca să nu crape stilul */}
      <QuestionbankTitleCard course="AI HL" theme="ai-hl" />

      <QuestionbankClientAIHL topics={SUBTOPICS_AIHL} />
    </PageHeader>
  );
}
