import { useState } from "react";

const SuggestionList = () => {
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      title: "Add Dark Mode",
      description: "Enable dark mode for better UI.",
      author: "Alice",
      votes: 10,
    },
    {
      id: 2,
      title: "Mobile App",
      description: "Create a mobile app for NeoLibrary.",
      author: "Bob",
      votes: 20,
    },
  ]);

  const upvoteSuggestion = (id) => {
    setSuggestions(
      suggestions.map((suggestion) =>
        suggestion.id === id
          ? { ...suggestion, votes: suggestion.votes + 1 }
          : suggestion
      )
    );
  };

  return (
    <div className="suggestion-list">
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className="p-4 mb-4 bg-white shadow-md rounded"
        >
          <h2 className="text-xl font-bold text-green-500">
            {suggestion.title}
          </h2>
          <p>{suggestion.description}</p>
          <p className="text-sm text-gray-500">By: {suggestion.author}</p>
          <p className="text-sm text-gray-500">Votes: {suggestion.votes}</p>
          <button
            onClick={() => upvoteSuggestion(suggestion.id)}
            className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Upvote
          </button>
        </div>
      ))}
    </div>
  );
};

export default SuggestionList;
