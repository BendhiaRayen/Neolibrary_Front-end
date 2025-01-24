import NavBar from "@/components/NavBar";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Main() {
  const navigate = useNavigate(); // React Router's navigation hook

  return (
    <div className="main-container">
      <NavBar />
      <header className="main-header">
        <h1>Welcome to NeoLibrary</h1>
        <p>Your centralized hub for knowledge sharing and collaboration.</p>
      </header>

      <section className="main-content">
        <button
          className="feature-button library"
          onClick={() => navigate("/LibraryofResources")} // Navigate to Library of Resources
        >
          <h2>Library of Resources</h2>
          <p>Browse categorized tools, guides, and plugins.</p>
        </button>
        <button
          className="feature-button shared-space"
          onClick={() => navigate("/SharedSpace")} // Navigate to Shared Space
        >
          <h2>Shared Space</h2>
          <p>Suggest resources, vote on ideas, and collaborate.</p>
        </button>
        <button
          className="feature-button explore-categories"
          onClick={() => navigate("/ExploreCategories")}
        >
          <h2>Explore Categories</h2>
          <p>Discover resources by category and find what you need faster.</p>
        </button>
      </section>

      <footer className="main-footer">
        <p>&copy; 2025 NeoLibrary. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Main;
