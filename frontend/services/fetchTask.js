import axios from "@/lib/axiosInstance";
import toast from "react-hot-toast";

// Main fetcher that returns full set + filtered sets
export const fetchTasks = async (filters = {}) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/tasks", {
      headers: { Authorization: `Bearer ${token}` },
      params: filters,
    });

    const tasks = res.data;
    const pendingTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    return {
      tasks,
      pendingTasks,
      completedTasks,
    };
  } catch (err) {
    toast.error("Failed to load tasks!");
    return {
      tasks: [],
      pendingTasks: [],
      completedTasks: [],
    };
  }
};
