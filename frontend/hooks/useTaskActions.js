"use client";
import axios from "@/lib/axiosInstance";
import toast from "react-hot-toast";
import { useTaskFilter } from "@/context/TaskFilterContext";

export function useTaskActions() {
  const { loadTasks } = useTaskFilter();

  const toggleTaskCompletion = async (taskId) => {
    try {
      console.log("taskId: ", taskId);

      const token = localStorage.getItem("token");
      await axios.patch(
        `/tasks/toggle/${taskId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await loadTasks();
    } catch (err) {
      console.error(err);

      toast.error("Failed to update status!");
    }
  };

  const deleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task deleted!");
      await loadTasks();
    } catch (err) {
      toast.error("Failed to delete task!");
    }
  };

  const toggleSubtaskStatus = async (taskId, subtaskIndex) => {
    try {
      await axios.patch(`/tasks/${taskId}/subtasks/${subtaskIndex}`);
      toast.success("Subtask updated!");
      await loadTasks();
    } catch (err) {
      toast.error("Failed to toggle subtask!");
    }
  };

  return { toggleTaskCompletion, deleteTask, toggleSubtaskStatus };
}
