// Status calculation
export function getDueStatus(dueDate, completed) {
  if (completed) return "completed";

  const today = new Date();
  const due = new Date(dueDate);

  const timeDiff = due - today;
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) return "overdue";
  if (daysLeft <= 2) return "near";

  return "normal";
}

// Styling based on status
export function getTaskStyles(status, repeat) {
  if (status === "completed") {
    return "border-gray-600";
  }
  if (repeat && repeat !== "none") {
    return "border-blue-500 bg-blue-900/30";
  }
  switch (status) {
    case "overdue":
      return "border-red-500 bg-red-900/30";
    case "near":
      return "border-yellow-400 bg-yellow-900/30";
    default:
      return "border-gray-600";
  }
}
