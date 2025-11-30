// src/components/flashcards/FlashcardsHeader.jsx
export default function FlashcardsHeader({
  course = "AA SL",
  coursePath = "/AA_SL/flashcards",
}) {
  const courseRoot = coursePath.replace("/flashcards", "") || "/AA_SL";
  return (
    <header className="mb-3">
      {/* breadcrumb identic cu Prediction */}
      <nav className="mb-4 md:mb-5 text-sm">
        <a href="/" className="text-teal-900 hover:underline">Home</a>
        <span className="mx-1 text-teal-900">›››</span>
        <a href={courseRoot} className="text-teal-900 hover:underline">{course}</a>
        <span className="mx-1 text-teal-900">›››</span>
        <a href={coursePath} className="text-teal-900 hover:underline">Flashcards</a>
      </nav>

      <h1 className="text-teal-900 font-semibold text-[26px] md:text-[30px] leading-tight">
        IB Mathematics {course} — Flashcards
      </h1>
    </header>
  );
}
