"use client";

import { useTaskFilter } from "@/context/TaskFilterContext";
import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  High: "#EF4444", // red
  Medium: "#FACC15", // yellow
  Low: "#22C55E", // green
};

export default function TasksByPriorityPie() {
  const { taskData } = useTaskFilter();

  const data = useMemo(() => {
    const counts = { High: 0, Medium: 0, Low: 0 };
    const allTasks = [...taskData.pendingTasks, ...taskData.completedTasks];

    allTasks.forEach((task) => {
      if (task.priority && counts[task.priority] !== undefined) {
        counts[task.priority] += 1;
      }
    });

    return Object.entries(counts)
      .filter(([_, count]) => count > 0)
      .map(([priority, count]) => ({ name: priority, value: count }));
  }, [taskData]);

  if (data.length === 0) {
    return (
      <p className="text-center text-gray-400 italic py-6">
        No task data available!
      </p>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl h-full">
      <h2 className="text-xl font-semibold text-center mb-4">
        Tasks by Priority Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} task(s)`, name]}
            contentStyle={{ backgroundColor: "#222", border: "none" }}
            labelStyle={{ color: "#ccc" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
