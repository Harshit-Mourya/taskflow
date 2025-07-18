require("dotenv").config();
const mongoose = require("mongoose");
const Task = require("../models/Task");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    runRepeatingTaskJob().finally(() => mongoose.disconnect());
  })
  .catch((err) => console.error("MongoDB connection error:", err));

async function runRepeatingTaskJob() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tasksToRepeat = await Task.find({
      repeat: { $ne: null },
      dueDate: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    console.log(`Found ${tasksToRepeat.length} repeatable tasks.`);

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
      console.log(`Created new task "${task.title}" for ${task.repeat}.`);
    }

    console.log("✔️ Repeating task job completed.");
  } catch (err) {
    console.error("❌ Error running repeating task job:", err);
  }
}

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
