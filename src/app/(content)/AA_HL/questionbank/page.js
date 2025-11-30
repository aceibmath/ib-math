// src/app/(content)/AA_HL/questionbank/page.js
export const dynamic = "force-dynamic";

import PageHeader from "@/components/ui/PageHeader";
import QuestionbankTitleCard from "@/components/questionbank/QuestionbankTitleCard";
import { SUBTOPICS } from "@/data/questionbank/aa-hl-subtopics";

// client-ul nou (identic ca la AA SL, dar pe folderul AA_HL)
import QuestionbankClient from "@/app/(content)/AA_HL/questionbank/QuestionbankClient";

export const metadata = { title: "Questionbank — AA HL" };

export default function Page() {
  return (
    <PageHeader>
      {/* ✅ aici adăugăm theme="aa-hl" */}
      <QuestionbankTitleCard course="AA HL" theme="aa-hl" />
      <QuestionbankClient topics={SUBTOPICS} />
    </PageHeader>
  );
}
