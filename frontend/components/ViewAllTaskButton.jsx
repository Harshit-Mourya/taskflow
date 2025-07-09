"use client";

export default function ViewAllTaskButton({ getAllTask }) {
  return (
    <button
      className="px-6 py-2 hover:bg-purple-600 rounded border border-purple-600 transition cursor-pointer"
      onClick={getAllTask}
    >
      View All
    </button>
  );
}
