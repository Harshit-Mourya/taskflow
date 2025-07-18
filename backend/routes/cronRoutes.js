const express = require("express");
const router = express.Router();
const { runCronJob } = require("../controllers/cronController");

router.post("/", runCronJob);

module.exports = router;
