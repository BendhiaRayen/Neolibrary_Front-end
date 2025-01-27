//import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "@/components/NavBar";
const LibraryOfResources = () => {
  return (
    <>
      <NavBar />
      <div className="library-container p-6">
        <h1 className="text-3xl font-bold text-green-500 mb-4">
          Library of Resources
        </h1>
        <p className="mb-4 text-lg">
          Browse a curated collection of tools, guides, and plugins that can
          help you achieve your goals.
          <NavLink
            to="/resource-list"
            className="text-green-500 font-bold hover:underline"
          >
            Go to Resource List
          </NavLink>
          .
        </p>
        <p className="text-lg">
          Have a valuable resource you&apos;d like to share with the community?
          Submit it to the library.
          <NavLink
            to="/resource-form"
            className="text-green-500 font-bold hover:underline"
          >
            Go to Resource Form
          </NavLink>
          .
        </p>
      </div>
    </>
  );
};

export default LibraryOfResources;
