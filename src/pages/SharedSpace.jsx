//import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "@/components/NavBar";
const SharedSpace = () => {
  return (
    <>
      <NavBar />
      <div className="shared-space-container p-6">
        <h1 className="text-3xl font-bold text-green-500 mb-4">Shared Space</h1>
        <p className="mb-4 text-lg">
          Explore the list of suggestions made by the community, vote for your
          favorite ones, and see what ideas others have contributed.
          <NavLink
            to="/suggestion-list"
            className="text-green-500 font-bold hover:underline"
          >
            Go to Suggestions List
          </NavLink>
          .
        </p>
        <p className="text-lg">
          Have an idea to improve NeoLibrary? Submit your own suggestion to help
          grow our platform.
          <NavLink
            to="/suggestion-form"
            className="text-green-500 font-bold hover:underline"
          >
            Go to Suggestion Form
          </NavLink>
          .
        </p>
      </div>
    </>
  );
};

export default SharedSpace;
