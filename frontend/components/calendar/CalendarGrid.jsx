"use client";
import { format } from "date-fns";

export default function CalendarGrid({
  currentMonth,
  selectedDate,
  handleDateClick,
  taskData,
  getMonthDates,
  getTasksForDate,
}) {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-7 gap-4">
      {getMonthDates(currentMonth).map((date) => {
        const tasks = getTasksForDate(taskData.tasks, date);
        const isSelected =
          selectedDate &&
          format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");

        return (
          <div
            key={date.toISOString()}
            className={`bg-gray-800 p-3 rounded cursor-pointer hover:bg-gray-700 ${
              isSelected ? "ring-2 ring-purple-500" : ""
            }`}
            onClick={() => handleDateClick(date)}
          >
            <p className="font-semibold text-sm mb-1">
              {format(date, "dd MMM")}
            </p>

            {tasks.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {tasks.slice(0, 3).map((task) => (
                  <span
                    key={task._id}
                    title={task.title}
                    className={`w-2 h-2 rounded-full ${
                      task.priority === "High"
                        ? "bg-red-500"
                        : task.priority === "Medium"
                        ? "bg-yellow-400"
                        : "bg-green-500"
                    }`}
                  ></span>
                ))}
                {tasks.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{tasks.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
