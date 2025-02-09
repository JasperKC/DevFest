import puppeteer from "puppeteer";
import fs from "fs";

const scrapeDiningHalls = async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "/usr/bin/chromium", // Manually specify the Chromium path
    args: ["--no-sandbox", "--disable-setuid-sandbox"] // Required for Render
  });

  const page = await browser.newPage();
  await page.goto("https://dining.columbia.edu/", { waitUntil: "networkidle2" });

  // Scrape dining halls
  const diningHalls = await page.evaluate(() => {
    let halls = [];
    document.querySelectorAll(".location.clearfix.dining-location.open").forEach((hall) => {
      let name = hall.querySelector(".name a")?.innerText.trim() || "Unknown";
      let link = hall.querySelector(".name a")?.href || "#";
      let openTime = hall.querySelector(".open-time")?.innerText.trim() || "No time listed";
      let status = hall.querySelector(".status")?.innerText.trim() || "Unknown status";
      halls.push({ name, link, openTime, status });
    });
    return halls;
  });

  console.log("📍 Found Dining Halls:", diningHalls);

  for (let hall of diningHalls) {
    const menuPage = await browser.newPage();
    await menuPage.goto(hall.link, { waitUntil: "networkidle2" });

    let menuItems = await menuPage.evaluate(() => {
      let items = [];
      document.querySelectorAll(".meal-title.ng-binding").forEach((item) => {
        items.push(item.innerText.trim());
      });
      return items;
    });

    hall.menu = menuItems.length ? menuItems : ["No menu available"];
    await menuPage.close();
  }

  console.log("🍽 Scraped Menus:", diningHalls);
  fs.writeFileSync("diningMenus.json", JSON.stringify(diningHalls, null, 2));
  console.log("✅ Saved menu data to diningMenus.json");

  await browser.close();
};

// ✅ Export the function for ES Modules
export { scrapeDiningHalls };

// Run the scraper immediately when the server starts
scrapeDiningHalls();
setInterval(scrapeDiningHalls, 10 * 60 * 1000);
