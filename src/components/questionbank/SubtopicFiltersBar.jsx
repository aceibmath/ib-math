// src/components/questionbank/SubtopicFiltersBar.jsx
"use client";

export default function SubtopicFiltersBar({
  questionType, onQuestionType,
  paper, onPaper,
  technology, onTechnology,
  difficulty, onDifficulty
}) {
  return (
    <form className="row g-2 align-items-end mb-3">
      <div className="col-6 col-md-3">
        <label className="form-label">Question Type</label>
        <select className="form-select" value={questionType} onChange={(e) => onQuestionType(e.target.value)}>
          <option value="">All</option>
          <option value="Short Style Question">Short Style Question</option>
          <option value="Long Style Question">Long Style Question</option>
        </select>
      </div>

      <div className="col-6 col-md-3">
        <label className="form-label">Paper</label>
        <select className="form-select" value={paper} onChange={(e) => onPaper(e.target.value)}>
          <option value="">All</option>
          <option value="Paper 1">Paper 1</option>
          <option value="Paper 2">Paper 2</option>
          <option value="Paper 3">Paper 3</option>
        </select>
      </div>

      <div className="col-6 col-md-3">
        <label className="form-label">Technology</label>
        <select className="form-select" value={technology} onChange={(e) => onTechnology(e.target.value)}>
          <option value="">Any</option>
          <option value="GDC">GDC</option>
          <option value="No GDC">No GDC</option>
        </select>
      </div>

      <div className="col-6 col-md-3">
        <label className="form-label">Difficulty</label>
        <select className="form-select" value={difficulty} onChange={(e) => onDifficulty(e.target.value)}>
          <option value="">Any</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>
    </form>
  );
}
