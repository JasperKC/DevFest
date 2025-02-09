import express from "express";
import fs from "fs";
import cors from "cors";
import cron from "node-cron";
import { exec } from "child_process";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get("/dining", (req, res) => {
  console.log("⏳ Loading latest dining menu...");
  fs.readFile("diningMenus.json", "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading JSON file:", err);
      return res.status(500).json({ error: "Failed to load menu data" });
    }
    res.json(JSON.parse(data));
  });
});

// Serve the news JSON
app.get("/news", (req, res) => {
  fs.readFile("news.json", "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading news JSON file:", err);
      return res.status(500).json({ error: "Failed to load news data" });
    }
    res.json(JSON.parse(data));
  });
});

// Run the news scraper daily at 7 AM
cron.schedule("0 7 * * *", () => {
  console.log("⏳ Running daily news scrape...");
  exec("node newsScraper.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error executing news script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`⚠️ Script stderr: ${stderr}`);
    }
    console.log(`✅ News Script Output: ${stdout}`);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
