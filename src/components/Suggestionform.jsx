import { useState } from "react";
import "../index.css";
import NavBar from "@/components/NavBar";
const SuggestionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to submit a suggestion.");
      }

      const response = await fetch("http://localhost:5000/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add suggestion");
      }

      setSuccess("Suggestion added successfully!");
      setError("");
      setTitle("");
      setDescription("");
    } catch (err) {
      setSuccess("");
      setError(err.message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="suggestion-container">
        <div className="suggestion-form">
          <h2>Submit a Suggestion</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SuggestionForm;
