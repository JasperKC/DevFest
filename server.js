import express from "express";
import fs from "fs";
import cors from "cors";
import cron from "node-cron";
import { exec } from "child_process";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Serve the dining menu JSON
app.get("/menus", (req, res) => {
  fs.readFile("diningMenus.json", "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading JSON file:", err);
      return res.status(500).json({ error: "Failed to load menu data" });
    }
    res.json(JSON.parse(data));
  });
});

// Run the scraper daily at 6 AM
cron.schedule("0 6 * * *", () => {
  console.log("⏳ Running daily dining menu scrape...");
  exec("node scraper.js", (error, stdout, stderr) => {
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

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
