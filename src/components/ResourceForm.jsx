//import React from "react";
import Form from "./Form";

const ResourceForm = () => {
  const fields = [
    { name: "contributor", label: "Contributor", type: "text", required: true },
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

  const handleSubmit = (data) => {
    console.log("Resource submitted:", data);
    // Add your backend API call or state update here
  };

  return (
    <Form title="Add a New Resource" fields={fields} onSubmit={handleSubmit} />
  );
};

export default ResourceForm;
