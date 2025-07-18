const cron = require("node-cron");
const generateRepeatingTasks = require("../cron/repeatTasks");

const startJobs = () => {
  cron.schedule("5 0 * * *", () => {
    console.log("Running repeat task cron job...");
    generateRepeatingTasks();
  });
};

module.exports = startJobs;
