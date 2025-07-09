"use client";

import TaskItem from "./TaskItem";

export default function TaskList({ tasks, title, titleClass }) {
  if (!tasks || tasks.length === 0) return null;

  return (
    <div>
      <h2 className={`text-xl font-semibold mb-3 ${titleClass}`}>{title}</h2>
      <ul className="space-y-4 max-h-[400px] overflow-y-auto">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
}
