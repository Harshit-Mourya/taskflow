"use client";
import { useTaskFilter } from "@/context/TaskFilterContext";
import { startOfWeek, endOfWeek, isWithinInterval, parseISO } from "date-fns";

export default function DashboardStats() {
  const { taskData } = useTaskFilter();

  const total = taskData.tasks.length;
  const pending = taskData.pendingTasks.length;
  const completed = taskData.completedTasks.length;

  const thisWeek = taskData.tasks.filter((task) => {
    const due = parseISO(task.dueDate);
    return isWithinInterval(due, {
      start: startOfWeek(new Date()),
      end: endOfWeek(new Date()),
    });
  }).length;

  const cards = [
    {
      title: "Total Tasks",
      value: total,
      color: "bg-gradient-to-br from-blue-500 to-blue-700 text-white",
    },
    {
      title: "Pending Tasks",
      value: pending,
      color: "bg-gradient-to-br from-yellow-400 to-yellow-600 text-black",
    },
    {
      title: "Completed Tasks",
      value: completed,
      color: "bg-gradient-to-br from-green-400 to-green-600",
    },
    {
      title: "Due This Week",
      value: thisWeek,
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`p-4 rounded-xl shadow-lg text-center backdrop-blur-sm  ${card.color}`}
        >
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <p className="text-2xl mt-2 font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
