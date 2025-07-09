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

  const loadTasks = useCallback(
    async ({ filters: newFilters = {}, replace = false } = {}) => {
      const finalFilters = replace ? newFilters : { ...filters, ...newFilters };
      setFilters(finalFilters);

      await loadAndSetTasks({
        filters: finalFilters,
        setTaskData,
      });
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
