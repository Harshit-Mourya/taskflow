"use client";

export default function SubtaskItem({ subtask, index, taskId, onToggle }) {
  return (
    <li className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={subtask.done}
        onChange={() => onToggle(taskId, index)}
        className="w-3 h-3 accent-blue-500 border-1 border-gray-600 rounded focus:ring-2 focus:ring-blue-400"
      />
      <span
        className={
          subtask.done ? "line-through text-gray-500" : "text-gray-200"
        }
      >
        {subtask.text}
      </span>
    </li>
  );
}
