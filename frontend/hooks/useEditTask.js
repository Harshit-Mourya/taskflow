"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/axiosInstance";
import toast from "react-hot-toast";

export default function useEditTask(id) {
  const [form, setForm] = useState({
    title: "",
    dueDate: "",
    details: "",
    priority: "",
    subtasks: [],
  });

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/tasks/${id}`);
        const { title, dueDate, details, priority, subtasks } = res.data;
        setForm({
          title,
          dueDate: dueDate.slice(0, 10),
          details,
          priority,
          subtasks: subtasks || [],
        });
        setReady(true);
      } catch (err) {
        toast.error("Failed to load task!");
      }
    };
    fetchTask();
  }, [id]);

  const updateTask = async (updatedForm, onSuccess) => {
    try {
      await axios.put(`/tasks/${id}`, updatedForm);
      toast.success("Task updated successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error("Failed to update task!");
    }
  };

  return { form, setForm, updateTask, ready };
}
