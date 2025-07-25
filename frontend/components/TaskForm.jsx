"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useEffect } from "react";

import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TaskForm({
  form,
  handleChange,
  handleSubmit,
  submitLabel,
  submittingLabel,
  submitting,
}) {
  const lastInputRef = useRef(null);

  useEffect(() => {
    if (lastInputRef.current) {
      lastInputRef.current.focus();
    }
  }, [form.subtasks.length]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md my-8"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">
        {submitLabel === "Add Task" ? "Add New Task" : "Edit Task"}
      </h1>

      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={form.title ?? ""}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Priority
        </label>
        <div className="flex space-x-4">
          {["Low", "Medium", "High"].map((level) => (
            <label
              key={level}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name="priority"
                value={level}
                checked={form.priority === level}
                onChange={handleChange}
                className="accent-purple-600 w-4 h-4"
                required
              />
              <span
                className={`text-sm ${
                  level === "Low"
                    ? "text-green-400"
                    : level === "Medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Repeat
        </label>
        <select
          name="repeat"
          value={form.repeat || "none"}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <textarea
        name="details"
        placeholder="Details (optional)"
        value={form.details ?? ""}
        onChange={handleChange}
        rows={3}
        className="w-full mb-4 px-4 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Subtasks
        </label>
        {form.subtasks?.map((sub, idx) => (
          <div key={idx} className="flex items-center mb-2 space-x-2">
            <input
              type="text"
              ref={idx === form.subtasks.length - 1 ? lastInputRef : null}
              value={sub.text ?? ""}
              onChange={(e) => {
                const updated = [...form.subtasks];
                updated[idx].text = e.target.value;
                handleChange({ target: { name: "subtasks", value: updated } });
              }}
              placeholder={`Subtask ${idx + 1}`}
              className="flex-grow px-3 py-2 border border-gray-700 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => {
                const updated = form.subtasks.filter((_, i) => i !== idx);
                handleChange({ target: { name: "subtasks", value: updated } });
              }}
              className="text-red-400 hover:text-red-600 text-lg cursor-pointer"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const updated = [
              ...(form.subtasks || []),
              { text: "", done: false },
            ];
            handleChange({ target: { name: "subtasks", value: updated } });
          }}
          className="text-sm text-purple-400 hover:text-purple-600 mt-1"
        >
          + Add Subtask
        </button>
      </div>

      <label htmlFor="dueDate" className="block text-sm mb-1 text-gray-300">
        Due Date
      </label>
      <input
        id="dueDate"
        type="date"
        name="dueDate"
        value={form.dueDate ?? ""}
        onChange={handleChange}
        className="w-full mb-6 px-4 py-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
        min={new Date().toISOString().split("T")[0]}
        disabled={submitting}
      />

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors cursor-pointer"
      >
        {submitting ? submittingLabel : submitLabel}
      </button>
    </form>
  );
}
