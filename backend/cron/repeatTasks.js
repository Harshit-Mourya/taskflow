const Task = require("../models/Task");
const dayjs = require("dayjs");

const generateRepeatingTasks = async () => {
  try {
    const today = dayjs().startOf("day");

    const tasks = await Task.find({ repeat: { $ne: null } });

    for (let task of tasks) {
      const taskDue = dayjs(task.dueDate).startOf("day");

      if (taskDue.isSame(today)) {
        let newDueDate;

        switch (task.repeat) {
          case "daily":
            newDueDate = taskDue.add(1, "day");
            break;
          case "weekly":
            newDueDate = taskDue.add(1, "week");
            break;
          case "monthly":
            newDueDate = taskDue.add(1, "month");
            break;
          case "yearly":
            newDueDate = taskDue.add(1, "year");
            break;
          default:
            continue;
        }

        const clonedTask = new Task({
          ...task.toObject(),
          _id: undefined,
          dueDate: newDueDate,
          createdAt: new Date(),
        });

        await clonedTask.save();
      }
    }

    console.log("Repeating tasks generated (if any)");
  } catch (error) {
    console.error("Error in generating repeating tasks:", error);
  }
};

module.exports = generateRepeatingTasks;
