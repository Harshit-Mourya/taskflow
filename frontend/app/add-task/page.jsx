"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "@/lib/axiosInstance";
import TaskForm from "@/components/TaskForm";
import useTaskForm from "@/hooks/useTaskForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useMemo } from "react";

export default function AddTaskPage() {
  const router = useRouter();

  const initialData = useMemo(
    () => ({
      title: "",
      dueDate: "",
      details: "",
      priority: "",
      subtasks: [{ text: "", done: false }],
    }),
    []
  );

  const handleAdd = async (form) => {
    try {
      await axios.post("/tasks", form); // No need to add headers
      toast.success("Task added successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to create task!");
    }
  };

  const { form, handleChange, handleSubmit } = useTaskForm(
    initialData,
    handleAdd
  );

  return (
    <ProtectedRoute>
      <div className="min-h-[92vh] flex items-center justify-center bg-gray-900 text-white px-4">
        <TaskForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          submitLabel="Add Task"
        />
      </div>{" "}
    </ProtectedRoute>
  );
}
