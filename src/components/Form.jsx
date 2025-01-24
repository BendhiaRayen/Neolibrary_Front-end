/* eslint-disable react/prop-types */
import { useState } from "react";
import "../index.css";

const Form = ({ title, fields, onSubmit }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(
      fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
    );
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="form-container bg-white p-6 shadow-md rounded"
    >
      <h2 className="text-2xl font-bold text-green-500 mb-4">{title}</h2>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm focus:ring-green-500 focus:border-green-500"
              rows="4"
              required={field.required}
            ></textarea>
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm focus:ring-green-500 focus:border-green-500"
              required={field.required}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
