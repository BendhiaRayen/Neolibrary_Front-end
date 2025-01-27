import { Link } from "react-router-dom";
import "../index.css";

function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">NeoLibrary</div>
        <div className="navbar-links">
          <Link to="/login" className="navbar-link">
            Login
          </Link>
          <Link to="/register" className="navbar-link">
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to NeoLibrary</h1>
            <p>
              Your centralized hub for knowledge sharing and collaboration. Join
              now to explore categorized resources, suggest ideas, and
              collaborate with others.
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="btn">
                Get Started
              </Link>
              <Link to="/register" className="btn btn-alt">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;
