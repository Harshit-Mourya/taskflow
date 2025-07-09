import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

export const getMonthDates = (currentMonth) => {
  return eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });
};

export const getTasksForDate = (tasks, date) => {
  return tasks.filter(
    (task) =>
      format(new Date(task.dueDate), "yyyy-MM-dd") ===
      format(date, "yyyy-MM-dd")
  );
};
