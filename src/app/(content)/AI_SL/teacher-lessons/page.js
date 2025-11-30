import PageHeader from "@/components/ui/PageHeader";
import ThreePane from "./_components/ThreePane";
import { topics } from "./_data/sections";
import TeacherLessonsTitleCard from "@/components/teacher-lessons/TeacherLessonsTitleCard";

export const metadata = { title: "Teacher Lessons — AI SL" };

export default function Page() {
  return (
    <PageHeader>
      <TeacherLessonsTitleCard course="AI SL" theme="ai-sl" />
      <ThreePane topics={topics} />
    </PageHeader>
  );
}
