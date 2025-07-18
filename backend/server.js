const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const cronRoutes = require("./routes/cronRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "https://hoppscotch.io",

  "https://taskflow-frontend-five.vercel.app",
  "https://vercel.com/harshit-mouryas-projects-0d42cca2/taskflow-frontend/2eerSpT9bLdqqNd6cgS68cW5Cihg",
  "https://actions.githubusercontent.com",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Incoming origin:", origin);

    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS!"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/cron", cronRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.listen(PORT, () => console.log(`Server listening to port ${PORT}...`));
