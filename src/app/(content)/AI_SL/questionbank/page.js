export const dynamic = "force-dynamic";

import PageHeader from "@/components/ui/PageHeader";
import QuestionbankTitleCard from "@/components/questionbank/QuestionbankTitleCard";
import QuestionbankClientAISL from "@/app/(content)/AI_SL/questionbank/QuestionbankClientAISL";

export const metadata = { title: "Questionbank — AI SL" };

export default function Page() {
  return (
    <div className="course-theme-ai-sl">
      <PageHeader>
        <QuestionbankTitleCard course="AI SL" theme="ai-sl" />
        <QuestionbankClientAISL />
      </PageHeader>
    </div>
  );
}
