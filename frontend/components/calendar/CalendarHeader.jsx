"use client";
import { format, subMonths, addMonths } from "date-fns";

export default function CalendarHeader({ currentMonth, setCurrentMonth }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
        className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 "
      >
        &larr; Prev
      </button>
      <h2 className="text-2xl font-bold">
        {format(currentMonth, "MMMM yyyy")}
      </h2>
      <button
        onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
        className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
      >
        Next &rarr;
      </button>
    </div>
  );
}
