import { useState, useEffect } from "react";
import "../index.css";
import NavBar from "@/components/NavBar";

const ResourceList = () => {
  const [resources, setResources] = useState([]); // State to store resources
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // State to show loading status
  const [role, setRole] = useState(""); // State to store the user's role

  // Decode the role from the JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      setRole(decoded.role);
    }
  }, []);

  // Fetch resources from the backend
  const fetchResources = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to view resources.");
      }

      const response = await fetch("http://localhost:5000/api/resources", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch resources");
      }

      setResources(data); // Update state with fetched resources
      setError("");
    } catch (err) {
      setResources([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a resource
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to delete resources.");
      }

      const response = await fetch(
        `http://localhost:5000/api/resources/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete resource");
      }

      // Remove the deleted resource from the list
      setResources((prevResources) =>
        prevResources.filter((resource) => resource._id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch resources when the component mounts
  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <>
      <NavBar />
      <div className="resource-list-container">
        <h2 className="text-2xl font-bold mb-4">Resources</h2>

        {loading && <p>Loading resources...</p>}

        {error && <p className="error-text">{error}</p>}

        {!loading && !error && resources.length === 0 && (
          <p>No resources found.</p>
        )}

        {!loading && !error && resources.length > 0 && (
          <ul className="resource-list">
            {resources.map((resource) => (
              <li key={resource._id} className="resource-item">
                <h3 className="text-xl font-semibold">{resource.title}</h3>
                <p>{resource.description}</p>
                <span className="text-sm text-gray-500">
                  Category: {resource.category}
                </span>
                <span className="text-sm text-gray-500">
                  Contributor: {resource.contributor || "Anonymous"}
                </span>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Visit Resource
                </a>
                {role === "admin" && (
                  <button
                    onClick={() => handleDelete(resource._id)}
                    className="text-red-500 ml-4"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ResourceList;
