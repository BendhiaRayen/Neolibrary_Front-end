import { useState } from "react";

function ExploreCategories() {
  const [category, setCategory] = useState(""); // State to store the entered category

  const handleSearch = () => {
    if (!category.trim()) {
      alert("Please enter a valid category name.");
    } else {
      alert(`Searching for resources in category: "${category}"`); // Placeholder action
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-500 mb-4">
        Explore Categories
      </h1>
      <div className="mt-4">
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter a category"
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-300"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-green-500 text-white font-bold px-4 py-2 rounded-md hover:bg-green-600"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default ExploreCategories;
