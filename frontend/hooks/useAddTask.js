"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "@/lib/axiosInstance";

const useAddTask = () => {
  const router = useRouter();
  const [creating, setCreating] = useState(false);

  const initialData = useMemo(
    () => ({
      title: "",
      dueDate: "",
      details: "",
      priority: "",
      subtasks: [],
      repeat: "none",
    }),
    []
  );

  const addTask = async (form) => {
    setCreating(true);
    try {
      await axios.post("/tasks", form);
      toast.success("Task added successfully!");
      router.push("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.error || "Failed to create task!");
    } finally {
      setCreating(false);
    }
  };

  return {
    form: initialData,
    addTask,
    creating,
  };
};

export default useAddTask;
