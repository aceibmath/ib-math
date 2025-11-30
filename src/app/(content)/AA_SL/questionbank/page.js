// src/app/(content)/AA_SL/questionbank/page.js
export const dynamic = "force-dynamic";

import PageHeader from "@/components/ui/PageHeader";
import { SUBTOPICS } from "@/data/questionbank/aa-sl-subtopics";
import QuestionbankClient from "@/app/(content)/AA_SL/questionbank/QuestionbankClient";
import QuestionbankTitleCard from "@/components/questionbank/QuestionbankTitleCard";

export const metadata = { title: "Questionbank — AA SL" };

export default function Page() {
  return (
    <PageHeader>
      <QuestionbankTitleCard course="AA SL" />
      <QuestionbankClient topics={SUBTOPICS} />
    </PageHeader>
  );
}
