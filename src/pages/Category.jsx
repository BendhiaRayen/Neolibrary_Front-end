import { useState } from "react";
import "../index.css";
import NavBar from "@/components/NavBar";
const CategoryForm = () => {
  const [category, setCategory] = useState(""); // State for category input
  const [resources, setResources] = useState([]); // State to store fetched resources
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false); // To track if search was triggered

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      setError("Please enter a valid category name.");
      return;
    }

    try {
      setLoading(true);
      setSearchTriggered(true); // Mark search triggered
      setError("");
      setResources([]);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to search resources.");
      }

      const response = await fetch(
        `http://localhost:5000/api/resources?category=${encodeURIComponent(
          category
        )}`, // Add proper encoding
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch resources.");
      }

      const data = await response.json();

      // Filter resources client-side to ensure strict category match
      const filteredResources = data.filter(
        (resource) =>
          resource.category &&
          resource.category.toLowerCase() === category.toLowerCase()
      );

      setResources(filteredResources);
      if (filteredResources.length === 0) {
        setError("No resources found for this category.");
        setSearchTriggered(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="category-container">
        <div className="category-form">
          <h2>Search Resources by Category</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="category">Category Name:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category name"
              required
            />
            {error && <p className="error-text">{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        <div className="resources-list">
          {searchTriggered && (
            <>
              <h3>Resources</h3>
              {loading && <p>Loading resources...</p>}
              {!loading && !error && resources.length === 0 && (
                <p>No resources found for this category.</p>
              )}
              {!loading && !error && resources.length > 0 && (
                <ul className="resource-list">
                  {resources.map((resource) => (
                    <li key={resource._id} className="resource-item">
                      <h4>{resource.title}</h4>
                      <p>{resource.description}</p>
                      <p>
                        <strong>Category:</strong> {resource.category}
                      </p>
                      <p>
                        <strong>Contributor:</strong>{" "}
                        {resource.contributor || "Anonymous"}
                      </p>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Resource
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
