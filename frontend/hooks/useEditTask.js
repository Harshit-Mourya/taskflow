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
    repeat: "",
  });

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchTask = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/tasks/${id}`);
        const { title, dueDate, details, priority, subtasks, repeat } =
          res.data;

        setForm({
          title,
          dueDate: dueDate.slice(0, 10),
          details,
          priority,
          subtasks: subtasks || [],
          repeat: repeat || "none",
        });
      } catch (err) {
        toast.error("Failed to load task!");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const updateTask = async (updatedForm, onSuccess) => {
    try {
      setUpdating(true);
      await axios.put(`/tasks/${id}`, updatedForm);
      toast.success("Task updated successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error("Failed to update task!");
    } finally {
      setUpdating(false);
    }
  };

  return { form, setForm, updateTask, loading, updating };
}
