"use client";

import { useState, useEffect } from "react";

export default function FilterComponent({ onFilterChange, resetSignal }) {
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const filters = {};
    if (priority) filters.priority = priority;
    if (status) filters.status = status;
    if (sort) filters.sort = sort;

    onFilterChange({ filters, replace: false }); // Notify parent of changes
  }, [priority, status, sort]);

  useEffect(() => {
    setPriority("");
    setStatus("");
    setSort("");
  }, [resetSignal]);

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 items-start sm:items-center sm:justify-center   rounded-xl  ">
      {/* Priority Filter */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 focus:outline-none"
      >
        <option value="">Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Status Filter */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 focus:outline-none"
      >
        <option value="">Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Sort by Due Date */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="bg-gray-900 text-white border border-gray-600 rounded px-2 py-1 focus:outline-none"
      >
        <option value="">Due Date</option>
        <option value="asc">Soonest First</option>
        <option value="desc">Latest First</option>
      </select>
    </div>
  );
}
