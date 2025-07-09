"use client";

import { format } from "date-fns";

export default function CalendarTaskList({
  selectedDate,
  setSelectedDate,
  taskData,
  getTasksForDate,
}) {
  return (
    <div className="mt-6 bg-gray-800 p-4 rounded">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">
          Tasks for {format(selectedDate, "dd MMM yyyy")}
        </h3>
        <button
          onClick={() => setSelectedDate(null)}
          className="text-sm text-gray-400 hover:text-red-400"
        >
          Close
        </button>
      </div>
      {getTasksForDate(taskData.tasks, selectedDate).length === 0 ? (
        <p className="text-center text-gray-400 italic py-4 border rounded border-gray-600 bg-gray-800">
          No tasks for this date.
        </p>
      ) : (
        <ul className="space-y-2">
          {getTasksForDate(taskData.tasks, selectedDate).map((task) => (
            <li
              key={task._id}
              className="p-2 bg-gray-700 rounded flex justify-between items-center"
            >
              <span>{task.title}</span>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  task.priority === "High"
                    ? "bg-red-500"
                    : task.priority === "Medium"
                    ? "bg-yellow-500 text-black"
                    : "bg-green-500"
                }`}
              >
                {task.priority}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
