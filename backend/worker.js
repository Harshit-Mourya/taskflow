require("dotenv").config();
const mongoose = require("mongoose");
const startJobs = require("./jobs");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB, starting jobs...");
    startJobs();
  })
  .catch((err) => console.error("Error:", err));
