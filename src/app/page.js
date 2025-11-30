import { FaBookOpen, FaQuestionCircle, FaFileAlt, FaIdCard, FaStar } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="container py-5">
      {/* Titlu și descriere */}
      <div className="text-center mb-5">
        <h1 className="fw-bold !text-brand-600">
          Welcome to <span style={{ color: "#007bff" }}>Ace</span>
          <span style={{ color: "#FFD700" }}>IB</span>
          <span style={{ color: "#dc3545" }}>Math</span>
        </h1>
        <p className="lead">
          Your ultimate IB Mathematics resource platform — designed for both students and teachers.
        </p>
      </div>

      {/* Secțiuni principale */}
      <div className="row g-4">
        {/* Lessons */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm text-center p-3 border-0">
            <FaBookOpen size={40} className="mb-3 text-primary" />
            <h5 className="fw-bold">Lessons</h5>
            <p>Structured lessons for AA SL and AA HL to help you master every IB Math concept.</p>
          </div>
        </div>

        {/* Question Bank */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm text-center p-3 border-0">
            <FaQuestionCircle size={40} className="mb-3 text-success" />
            <h5 className="fw-bold">Question Bank</h5>
            <p>Thousands of practice questions with step-by-step solutions to enhance your skills.</p>
          </div>
        </div>

        {/* Past Papers */}
        <div className="col-md-4">
          <div className="card h-100 shadow-sm text-center p-3 border-0">
            <FaFileAlt size={40} className="mb-3 text-warning" />
            <h5 className="fw-bold">Past Papers</h5>
            <p>Access real IB exam papers and practice under real exam conditions.</p>
          </div>
        </div>
      </div>

      {/* Secțiuni secundare */}
      <div className="row g-4 mt-3">
        {/* Flash Cards */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm text-center p-3 border-0">
            <FaIdCard size={40} className="mb-3 text-danger" />
            <h5 className="fw-bold">Flash Cards</h5>
            <p>Interactive flashcards to help memorize formulas, definitions, and key concepts easily.</p>
          </div>
        </div>

        {/* Membership */}
        <div className="col-md-6">
          <div className="card h-100 shadow-sm text-center p-3 border-0">
            <FaStar size={40} className="mb-3 text-info" />
            <h5 className="fw-bold">Membership</h5>
            <p>Choose between Free Plan and Premium Plan for exclusive content and benefits.</p>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center mt-5">
        <a href="/register" className="btn btn-lg btn-primary px-4 me-2">Get Started</a>
        <a href="/login" className="btn btn-lg btn-outline-secondary px-4">Login</a>
      </div>

      {/* Linkuri vizibile pentru verificare (se văd și pe homepage) */}
      <div className="text-center mt-3 small">
        <a href="/privacy" className="me-3">Privacy Policy</a>
        <a href="/terms" className="me-3">Terms</a>
        <a href="mailto:contact@aceibmath.com">contact@aceibmath.com</a>
      </div>
    </div>
  );
}
