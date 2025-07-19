export function getTaskStatusData(tasks = []) {
  const statusCount = {
    Completed: 0,
    Pending: 0,
    Overdue: 0,
  };

  tasks.forEach((task) => {
    if (task.completed) {
      statusCount.Completed++;
    } else {
      const isOverdue = new Date(task.dueDate) < new Date();
      if (isOverdue) {
        statusCount.Overdue++;
      } else {
        statusCount.Pending++;
      }
    }
  });

  return [
    { name: "Completed", value: statusCount.Completed },
    { name: "Pending", value: statusCount.Pending },
    { name: "Overdue", value: statusCount.Overdue },
  ];
}
