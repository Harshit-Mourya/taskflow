"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { loadAndSetTasks } from "@/services/taskService";

const TaskFilterContext = createContext();

export const TaskFilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({});
  const [resetSignal, setResetSignal] = useState(0);
  const [taskData, setTaskData] = useState({
    tasks: [],
    pendingTasks: [],
    completedTasks: [],
  });
  const [loading, setLoading] = useState(false);

  const loadTasks = useCallback(
    async ({ filters: newFilters = {}, replace = false } = {}) => {
      const finalFilters = replace ? newFilters : { ...filters, ...newFilters };
      setFilters(finalFilters);

      setLoading(true);

      try {
        await loadAndSetTasks({
          filters: finalFilters,
          setTaskData,
        });
      } catch (err) {
        console.error("Error loading tasks:", err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleViewAll = async () => {
    setResetSignal((prev) => prev + 1);
    await loadTasks({ filters: {}, replace: true });
  };

  return (
    <TaskFilterContext.Provider
      value={{
        filters,
        resetSignal,
        taskData,
        loading,
        setTaskData,
        loadTasks,
        handleViewAll,
      }}
    >
      {children}
    </TaskFilterContext.Provider>
  );
};

export const useTaskFilter = () => useContext(TaskFilterContext);
