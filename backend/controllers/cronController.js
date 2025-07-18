const Task = require("../models/Task");

const runCronJob = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token: ", token);

  if (token !== process.env.CRON_SECRET) {
    return res.status(403).json({ message: "Forbidden: Invalid token!" });
  }

  try {
    // 1. Delete old tasks
    const deleteResult = await Task.deleteMany({
      createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    // 2. Create new repeatable tasks
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tasksToRepeat = await Task.find({
      repeat: { $ne: null },
      dueDate: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    for (const task of tasksToRepeat) {
      const newDueDate = getNextDueDate(task.dueDate, task.repeat);

      const duplicatedTask = new Task({
        ...task.toObject(),
        _id: mongoose.Types.ObjectId(),
        isNew: true,
        completed: false,
        dueDate: newDueDate,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await duplicatedTask.save();
    }

    return res.json({
      message: "Cron job executed",
      deleted: deleteResult.deletedCount,
      repeated: tasksToRepeat.length,
    });
  } catch (err) {
    console.error("Cron error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

function getNextDueDate(currentDate, repeatType) {
  const nextDate = new Date(currentDate);
  switch (repeatType) {
    case "daily":
      nextDate.setDate(nextDate.getDate() + 1);
      break;
    case "weekly":
      nextDate.setDate(nextDate.getDate() + 7);
      break;
    case "monthly":
      nextDate.setMonth(nextDate.getMonth() + 1);
      break;
    case "yearly":
      nextDate.setFullYear(nextDate.getFullYear() + 1);
      break;
  }
  return nextDate;
}

module.exports = { runCronJob };
