import express from "express";
import cors from "cors";
import fs from "fs";
import { scrapeDiningHalls } from "./scraper.js";
import cron from "node-cron";
import { exec } from "child_process";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// **Run scraper immediately when the server starts**
console.log("⏳ Running initial dining menu scrape...");
scrapeDiningHalls().then(() => {
  console.log("✅ Initial dining menu scrape complete!");
});

// **Serve the latest dining data (without waiting for Puppeteer)**
app.get("/dining", async (req, res) => {
  console.log("🔄 Fetching latest dining data...");

  fs.readFile("diningMenus.json", "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading JSON file:", err);
      return res.status(500).json({ error: "Failed to load menu data" });
    }
    res.setHeader("Cache-Control", "no-store"); // Prevent browser caching
    res.json(JSON.parse(data));
  });
});

// **Run the news scraper daily at 7 AM**
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

// **Start the server**
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
