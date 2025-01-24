//import React from "react";
import Form from "./Form";

const SuggestionForm = () => {
  const fields = [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "author", label: "Author", type: "text", required: true },

    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
    },
  ];

  const handleSubmit = (data) => {
    console.log("Suggestion submitted:", data);
    // Add your backend API call or state update here
  };

  return (
    <Form
      title="Add a New Suggestion"
      fields={fields}
      onSubmit={handleSubmit}
    />
  );
};

export default SuggestionForm;
