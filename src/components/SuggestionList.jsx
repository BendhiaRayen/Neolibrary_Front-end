import { useState, useEffect } from "react";
import "../index.css";
import NavBar from "@/components/NavBar";

const SuggestionList = () => {
  const [suggestions, setSuggestions] = useState([]); // State to store suggestions
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

  // Fetch suggestions from the backend
  const fetchSuggestions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You must be logged in to view suggestions.");
      }

      const response = await fetch("http://localhost:5000/api/suggestions", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch suggestions");
      }

      setSuggestions(data);
      setError("");
    } catch (err) {
      setSuggestions([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle upvote/downvote
  const handleVote = async (id, type) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to vote.");
      }

      const response = await fetch(
        `http://localhost:5000/api/suggestions/${id}/${type}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to ${type} suggestion`);
      }

      // Update the suggestion list dynamically
      setSuggestions((prevSuggestions) =>
        prevSuggestions.map((suggestion) =>
          suggestion._id === id
            ? { ...suggestion, votes: data.suggestion.votes } // Update the vote count
            : suggestion
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to delete suggestions.");
      }

      const response = await fetch(
        `http://localhost:5000/api/suggestions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete suggestion");
      }

      // Remove the deleted suggestion from the list
      setSuggestions((prevSuggestions) =>
        prevSuggestions.filter((suggestion) => suggestion._id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <>
      <NavBar />
      <div className="suggestion-list-container">
        <h2 className="text-2xl font-bold mb-4">Suggestions</h2>

        {loading && <p>Loading suggestions...</p>}

        {error && <p className="error-text">{error}</p>}

        {!loading && !error && suggestions.length === 0 && (
          <p>No suggestions found.</p>
        )}

        {!loading && !error && suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((suggestion) => (
              <li key={suggestion._id} className="suggestion-item">
                <h3 className="text-xl font-semibold">{suggestion.title}</h3>
                <p>{suggestion.description}</p>
                <span className="text-sm text-gray-500">
                  Submitted by: {suggestion.author?.name || "Anonymous"}
                </span>
                <div className="vote-buttons mt-2">
                  <button
                    className="upvote-button text-green-500"
                    onClick={() => handleVote(suggestion._id, "upvote")}
                  >
                    Upvote
                  </button>
                  <span className="mx-2">Votes: {suggestion.votes || 0}</span>
                  <button
                    className="downvote-button text-red-500"
                    onClick={() => handleVote(suggestion._id, "downvote")}
                  >
                    Downvote
                  </button>
                  {role === "admin" && (
                    <button
                      className="delete-button text-red-500 ml-4"
                      onClick={() => handleDelete(suggestion._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SuggestionList;
