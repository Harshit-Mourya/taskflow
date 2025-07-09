const express = require("express");
const {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  getTaskById,
  toggleTaskCompletion,
  toggleSubtask,
} = require("../controllers/taskController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.get("/", verifyToken, getTasks);
router.post("/", verifyToken, createTask);
router.get("/:id", verifyToken, getTaskById);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);
router.patch("/toggle/:id", verifyToken, toggleTaskCompletion);
router.patch("/:taskId/subtasks/:subtaskIndex", verifyToken, toggleSubtask);

module.exports = router;
