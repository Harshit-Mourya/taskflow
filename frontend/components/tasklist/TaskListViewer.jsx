"use client";

import TaskList from "@/components/tasklist/TaskList";
import { useTaskFilter } from "@/context/TaskFilterContext.jsx";

export default function TaskListViewer() {
  const { taskData } = useTaskFilter();
  const { pendingTasks, completedTasks } = taskData;

  return (
    <div className="space-y-8">
      {pendingTasks.length > 0 && (
        <TaskList tasks={pendingTasks} title="🕒 Pending Tasks" />
      )}
      {completedTasks.length > 0 && (
        <TaskList
          tasks={completedTasks}
          title="✅ Completed Tasks"
          titleClass="text-green-400"
        />
      )}
    </div>
  );
}
