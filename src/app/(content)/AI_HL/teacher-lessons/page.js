import PageHeader from "@/components/ui/PageHeader";
import ThreePane from "./_components/ThreePane";
import { topics } from "./_data/sections";
import TeacherLessonsTitleCard from "@/components/teacher-lessons/TeacherLessonsTitleCard";

export const metadata = { title: "Teacher Lessons — AI HL" };

export default function Page() {
  return (
    <PageHeader>
      <TeacherLessonsTitleCard course="AI HL" theme="ai-hl" />
      <ThreePane topics={topics} />
    </PageHeader>
  );
}
