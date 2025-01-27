import { useState } from "react";
import Form from "./Form";
import NavBar from "@/components/NavBar";
const ResourceForm = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fields = [
    { name: "title", label: "Title", type: "text", required: true },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
    { name: "category", label: "Category", type: "text", required: true },
    { name: "link", label: "Link", type: "url", required: true },
  ];

  const handleSubmit = async (data) => {
    try {
      // Extract token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("You must be logged in to add a resource.");
      }

      const response = await fetch("http://localhost:5000/api/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add resource");
      }

      setSuccessMessage("Resource added successfully!");
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(err.message);
      setSuccessMessage(""); // Clear any success messages
    }
  };

  return (
    <div className="p-6">
      <NavBar />
      <h1 className="text-3xl font-bold mb-4">Add a New Resource</h1>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <Form
        title="Add a New Resource"
        fields={fields}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ResourceForm;
