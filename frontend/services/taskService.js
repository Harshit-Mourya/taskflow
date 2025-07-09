import { fetchTasks } from "@/services/fetchTask";

export const loadAndSetTasks = async ({ filters, setTaskData }) => {
  const data = await fetchTasks(filters);
  setTaskData(data);
};
