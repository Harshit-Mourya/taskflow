"use client";

// Hooks & Utils
import { useTaskFilter } from "@/context/TaskFilterContext";
import { useMemo, useState, useEffect } from "react";
import {
  format,
  parse,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
  differenceInMonths,
} from "date-fns";

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

// Notifications
import toast from "react-hot-toast";

export default function TasksCreatedVsCompleted() {
  const { taskData } = useTaskFilter();

  // State: Dropdown selection + date range
  const [range, setRange] = useState("6");
  const [startDate, setStartDate] = useState(
    startOfMonth(subMonths(new Date(), 5))
  );
  const [endDate, setEndDate] = useState(endOfMonth(new Date()));

  // Effect: Validate range and auto-correct if exceeds 6 months
  useEffect(() => {
    const diff = differenceInMonths(endDate, startDate);
    if (diff > 6) {
      toast.error("Max range is 6 months!");
      setStartDate(startOfMonth(subMonths(endDate, 5)));
    }
  }, [startDate, endDate]);

  // Chart Data Generation
  const data = useMemo(() => {
    const months = eachMonthOfInterval({ start: startDate, end: endDate }).map(
      (date) => format(date, "yyyy-MM")
    );

    const createdMap = {};
    const completedMap = {};

    taskData.pendingTasks.concat(taskData.completedTasks).forEach((task) => {
      if (task.createdAt) {
        const key = format(new Date(task.createdAt), "yyyy-MM");
        createdMap[key] = (createdMap[key] || 0) + 1;
      }
    });

    taskData.completedTasks.forEach((task) => {
      if (!task.updatedAt && !task.dueDate) return;
      const key = format(new Date(task.updatedAt || task.dueDate), "yyyy-MM");
      completedMap[key] = (completedMap[key] || 0) + 1;
    });

    return months.map((month) => ({
      date: format(parse(month, "yyyy-MM", new Date()), "MMM"),
      created: createdMap[month] || 0,
      completed: completedMap[month] || 0,
    }));
  }, [taskData.completedTasks, startDate, endDate]);

  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      {/* Heading */}
      <h2 className="text-xl text-center font-semibold mb-4">
        Tasks Created vs Completed
      </h2>

      {/* Filter: Range Dropdown + Custom Period Inputs */}
      <div className="flex flex-col items-center justify-center gap-4 flex-wrap mb-4">
        <select
          value={range}
          onChange={(e) => {
            const val = e.target.value;
            setRange(val);
            if (val !== "custom") {
              const monthsBack = parseInt(val);
              const now = new Date();
              setStartDate(startOfMonth(subMonths(now, monthsBack - 1)));
              setEndDate(endOfMonth(now));
            }
          }}
          className="bg-gray-700 text-white text-sm px-3 py-1 rounded"
        >
          <option value="1">Last 1 Month</option>
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
          <option value="custom">Custom Period</option>
        </select>

        {/* 🛠 Custom Date Inputs */}
        {range === "custom" && (
          <>
            <div>
              <label className="text-sm text-gray-300 block mb-1">Start:</label>
              <input
                type="month"
                value={format(startDate, "yyyy-MM")}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="bg-gray-700 text-white px-2 py-1 rounded"
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 block mb-1">End:</label>
              <input
                type="month"
                value={format(endDate, "yyyy-MM")}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                className="bg-gray-700 text-white px-2 py-1 rounded"
              />
            </div>
          </>
        )}
      </div>

      {/* Chart or Empty State */}
      {data.length === 0 ? (
        <p className="text-center text-gray-400 italic py-6">
          No task data available.
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="date"
              stroke="#ccc"
              angle={0}
              textAnchor="middle"
              height={60}
            >
              <Label
                value="Month"
                offset={10}
                position="insideBottom"
                fill="#ccc"
              />
            </XAxis>
            <YAxis allowDecimals={false} stroke="#ccc">
              <Label
                value="Tasks"
                angle={-90}
                offset={25}
                position="insideLeft"
                fill="#ccc"
              />
            </YAxis>
            <Tooltip
              contentStyle={{ backgroundColor: "#222", border: "none" }}
              labelStyle={{ color: "#ccc" }}
              formatter={(value, name) => [
                `${value} task(s)`,
                name === "created" ? "Created" : "Completed",
              ]}
            />
            <Line
              type="monotone"
              dataKey="created"
              stroke="#fbbf24"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Created"
            />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Completed"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
