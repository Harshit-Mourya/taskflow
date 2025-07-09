const Task = require("../models/Task");

// GET all tasks for the logged-in user
const getTasks = async (req, res) => {
  try {
    const { search, priority, status, sort } = req.query;
    const query = { user: req.user.id };

    if (search) {
      console.log("trying search: ", search);

      query.title = { $regex: search, $options: "i" };
    }

    if (priority) {
      query.priority = priority;
    }

    if (status === "Pending") {
      query.completed = false;
    } else if (status === "Completed") {
      query.completed = true;
    }

    let tasksQuery = Task.find(query);

    if (sort === "asc") {
      tasksQuery = tasksQuery.sort({ dueDate: 1 });
    } else if (sort === "desc") {
      tasksQuery = tasksQuery.sort({ dueDate: -1 });
    }

    const tasks = await tasksQuery;
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks!" });
  }
};

// CREATE a new task
const createTask = async (req, res) => {
  const { title, dueDate, details, priority, subtasks } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ error: "Title and due date are required!" });
  }

  try {
    const newTask = new Task({
      title,
      dueDate,
      details,
      priority,
      user: req.user.id,
      subtasks: Array.isArray(subtasks) ? subtasks : [],
    });

    const savedTask = await newTask.save();
    console.log("Task created!");

    res.status(201).json(savedTask);
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Failed to create task!" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id, // ensure task belongs to user
    });

    if (!task) return res.status(404).json({ error: "Task not found!" });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch task!" });
  }
};

// UPDATE a task
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, dueDate, completed, details, priority, subtasks } = req.body;

  try {
    const task = await Task.findOne({ _id: taskId, user: req.user.id });

    if (!task) {
      return res.status(404).json({ error: "Task not found or unauthorized!" });
    }

    if (title !== undefined) task.title = title;
    if (details !== undefined) task.details = details;
    if (priority !== undefined) task.priority = priority;
    if (Array.isArray(subtasks)) task.subtasks = subtasks;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ error: "Failed to update task!" });
  }
};

// DELETE a task
const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({ _id: taskId, user: req.user.id });

    if (!task) {
      return res.status(404).json({ error: "Task not found or unauthorized!" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task!" });
  }
};

const toggleTaskCompletion = async (req, res) => {
  try {
    // console.log(req.params.id);

    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

    if (!task) {
      return res.status(404).json({ error: "Task not found!" });
    }

    // console.log(task);

    task.completed = !task.completed;
    await task.save();

    res.json({
      message: "Task completion updated!",
      completed: task.completed,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error!" });
  }
};

const toggleSubtask = async (req, res) => {
  const { taskId, subtaskIndex } = req.params;

  try {
    const task = await Task.findOne({ _id: taskId, user: req.user.id });
    if (!task) {
      return res.status(404).json({ error: "Task not found!" });
    }

    const index = parseInt(subtaskIndex);

    if (
      !Array.isArray(task.subtasks) ||
      index < 0 ||
      index >= task.subtasks.length
    ) {
      return res.status(400).json({ error: "Invalid subtask index!" });
    }

    task.subtasks[index].done = !task.subtasks[index].done;
    await task.save();

    res.json({ message: "Subtask status updated!", task });
  } catch (err) {
    console.error("Toggle subtask error:", err.message);
    res.status(500).json({ error: "Server error while toggling subtask!" });
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  getTaskById,
  toggleTaskCompletion,
  toggleSubtask,
};
