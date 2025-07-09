"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Components

import DashboardHeader from "./DashboardHeader";
import DashboardToolbar from "./DashboardToolbar.jsx";
import TaskListViewer from "../tasklist/TaskListViewer";
import DashboardStats from "./DashboardStats";
import GraphSlider from "../taskcharts/GraphSlider";

// Context
import { useTaskFilter } from "@/context/TaskFilterContext";

export default function Dashboard() {
  const router = useRouter();
  const { taskData, loadTasks } = useTaskFilter();
  const { pendingTasks, completedTasks } = taskData;

  const noTasks = pendingTasks.length === 0 && completedTasks.length === 0;

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-[92vh] bg-gray-900 text-white p-4 sm:p-6">
      {/* Top Bar */}
      <DashboardHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Sidebar: Filters + Stats */}
        <div className="md:col-span-1 space-y-2 lg:flex lg:flex-col lg:justify-between lg:max-h-[75vh]">
          {/* <div className=" rounded-2xl shadow">
            <DashboardToolbar />
          </div> */}

          <div className="">
            <DashboardStats />
          </div>
          <div className="mt-4">
            <GraphSlider />
          </div>
        </div>

        {/* Main content: Task List */}
        <div className="md:col-span-1 space-y-6">
          <div className=" rounded-2xl shadow">
            <DashboardToolbar />
          </div>
          <div className="bg-gray-800 p-4 rounded-2xl shadow">
            {noTasks ? (
              <p className="text-center text-gray-400 text-lg mt-10">
                No tasks found.
              </p>
            ) : (
              <TaskListViewer />
            )}
          </div>
        </div>
      </div>

      {/* Filter / Search / ViewAll */}
      {/* <DashboardToolbar /> */}

      {/* <DashboardStats /> */}

      {/* Task Lists */}
      {/* {noTasks ? (
        <p className="text-center text-gray-400 text-lg mt-10">
          No tasks found.
        </p>
      ) : (
        <TaskListViewer />
      )} */}
    </div>
  );
}
