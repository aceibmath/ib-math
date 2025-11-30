// src/app/(content)/AA_HL/teacher-lessons/page.js
import PageHeader from "@/components/ui/PageHeader";
import ThreePane from "./_components/ThreePane";
import { topics } from "./_data/sections";
import TeacherLessonsTitleCard from "@/components/teacher-lessons/TeacherLessonsTitleCard";

export const metadata = { title: "Teacher Lessons — AA HL" };

export default function Page() {
  return (
    <PageHeader>
      <TeacherLessonsTitleCard course="AA HL" theme="aa-hl" />
      <ThreePane topics={topics} />
    </PageHeader>
  );
}
