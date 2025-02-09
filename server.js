import express from "express";
import cors from "cors";
import fs from "fs";
import { scrapeDiningHalls } from "./scraper.js"; // Ensure you import the scraper

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// **Run scraper immediately when server starts**
console.log("⏳ Running initial dining menu scrape...");
scrapeDiningHalls().then(() => {
  console.log("✅ Initial dining menu scrape complete!");
});

// **Set up an interval to refresh dining data every 10 minutes**
setInterval(() => {
  console.log("🔄 Running scheduled dining menu update...");
  scrapeDiningHalls().then(() => {
    console.log("✅ Scheduled dining menu update complete!");
  });
}, 10 * 60 * 1000);

// **Serve the latest dining data**
app.get("/dining", (req, res) => {
  fs.readFile("diningMenus.json", "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading JSON file:", err);
      return res.status(500).json({ error: "Failed to load menu data" });
    }
    res.json(JSON.parse(data));
  });
});

// **Serve the latest news data**
app.get("/news", (req, res) => {
  fs.readFile("news.json", "utf8", (err, data) => {
    if (err) {
      console.error("❌ Error reading news JSON file:", err);
      return res.status(500).json({ error: "News data not available. Please try again later." });
    }
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