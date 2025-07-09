const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", verifyToken, getMe);

module.exports = router;
