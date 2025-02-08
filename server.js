import cron from "node-cron";
import { exec } from "child_process";

// Run scraper every day at 6 AM
cron.schedule("0 6 * * *", () => {
  console.log("⏳ Running daily dining menu scrape...");
  exec("node scrape.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error executing script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Script stderr: ${stderr}`);
    }
    console.log(`✅ Script Output: ${stdout}`);
  });
});
