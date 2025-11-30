import PageHeader from "@/components/ui/PageHeader";
import ThreePane from "./_components/ThreePane";
import { topics } from "./_data/sections";
import TeacherLessonsTitleCard from "@/components/teacher-lessons/TeacherLessonsTitleCard";

export const metadata = { title: "Teacher Lessons — AA SL" };

export default function Page() {
  return (
    <PageHeader>
      <TeacherLessonsTitleCard course="AA SL" theme="aa-sl" />
      <ThreePane topics={topics} />
    </PageHeader>
  );
}
