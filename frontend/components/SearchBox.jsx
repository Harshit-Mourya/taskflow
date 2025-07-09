"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function SearchBox({ onSearch, resetSignal }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm("");
  }, [resetSignal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast("Please enter something to search!");

      return;
    }

    await onSearch({ filters: { search: searchTerm.trim() }, replace: false });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-gray-800 border border-gray-700 rounded px-3 py-2"
    >
      <button type="submit">
        <FontAwesomeIcon
          icon={faSearch}
          className="text-gray-400 mr-3 cursor-pointer"
        />{" "}
      </button>

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent outline-none text-white placeholder-gray-400 flex-1"
      />
    </form>
  );
}
