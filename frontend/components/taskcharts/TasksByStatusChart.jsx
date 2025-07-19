"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { useTaskFilter } from "@/context/TaskFilterContext";
import { getTaskStatusData } from "@/utils/getTaskStatusData";

const COLORS = {
  Completed: "#4ade80", // green-400
  Pending: "#facc15", // yellow-400
  Overdue: "#f87171", // red-400
};

export default function TasksByStatusChart() {
  const { taskData } = useTaskFilter();
  const data = getTaskStatusData(taskData.tasks);

  return (
    <div className="bg-gray-800 p-6 rounded-xl h-full flex flex-col justify-between">
      <h2 className="text-xl text-center font-semibold mb-4 text-white">
        Tasks by Status
      </h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-400 italic py-6">
          No task data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis allowDecimals={false} stroke="#ccc" />
            <Tooltip
              contentStyle={{ backgroundColor: "#222", border: "none" }}
              labelStyle={{ color: "#ccc" }}
              itemStyle={{ color: "#fff" }}
            />
            <Bar dataKey="value" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
