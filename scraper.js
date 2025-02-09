import puppeteer from "puppeteer";
import fs from "fs";

const DINING_URL = "https://dining.columbia.edu/";

const scrapeDiningHalls = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(DINING_URL, { waitUntil: "networkidle2" });

  // Get the list of open dining halls
  const diningHalls = await page.evaluate(() => {
    let halls = [];
    document
      .querySelectorAll(".location.clearfix.dining-location.open")
      .forEach((hall) => {
        let name = hall.querySelector(".name a")?.innerText.trim() || "Unknown";
        let link = hall.querySelector(".name a")?.href || "#";
        let openTime =
          hall.querySelector(".open-time")?.innerText.trim() ||
          "No time listed";
        let status =
          hall.querySelector(".status")?.innerText.trim() || "Unknown status";

        halls.push({ name, link, openTime, status });
      });
    return halls;
  });

  console.log("📍 Found Dining Halls:", diningHalls);

  // Now visit each dining hall page to scrape the menu
  for (let hall of diningHalls) {
    console.log(`🔎 Scraping menu for: ${hall.name}`);
    const menuPage = await browser.newPage();
    await menuPage.goto(hall.link, { waitUntil: "networkidle2" });

    // Ensure menu items are loaded
    await menuPage
      .waitForSelector(".meal-title.ng-binding", { timeout: 5000 })
      .catch(() => {
        console.log(`⚠️ No menu found for ${hall.name}`);
        return;
      });

    // Extract menu items
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

  // Save to JSON file
  fs.writeFileSync("diningMenus.json", JSON.stringify(diningHalls, null, 2));
  console.log("✅ Saved menu data to diningMenus.json");

  await browser.close();
};

scrapeDiningHalls();

export {scrapeDiningHalls}

// Schedule scraper to run every 10 minutes
setInterval(scrapeDiningHalls, 10 * 60 * 1000);
