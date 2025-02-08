import puppeteer from "puppeteer";
import fs from "fs";

const scrapeNews = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let news = [];

  // Scrape first news website (Example: The New York Times)
  try {
    await page.goto("https://www.nytimes.com/", { waitUntil: "networkidle2" });
    let nytimesNews = await page.evaluate(() => {
      let articles = [];
      document.querySelectorAll("article").forEach((article) => {
        let headline =
          article.querySelector("h2")?.innerText.trim() || "No headline";
        let link = article.querySelector("a")?.href || "#";
        let category =
          article.querySelector("section")?.innerText.trim() || "General";

        articles.push({ headline, link, category });
      });
      return articles;
    });

    news = [...news, ...nytimesNews];
  } catch (error) {
    console.error("❌ Error scraping NYT:", error);
  }

  // Scrape second news website (Example: BBC)
  try {
    await page.goto("https://www.bbc.com/news", { waitUntil: "networkidle2" });
    let bbcNews = await page.evaluate(() => {
      let articles = [];
      document.querySelectorAll(".gs-c-promo").forEach((article) => {
        let headline =
          article
            .querySelector(".gs-c-promo-heading__title")
            ?.innerText.trim() || "No headline";
        let link = article.querySelector("a")?.href || "#";
        let category =
          article.querySelector(".gs-c-section-link")?.innerText.trim() ||
          "General";

        articles.push({ headline, link, category });
      });
      return articles;
    });

    news = [...news, ...bbcNews];
  } catch (error) {
    console.error("❌ Error scraping BBC:", error);
  }

  console.log("📰 Scraped News:", news);

  // Save to JSON file
  fs.writeFileSync("news.json", JSON.stringify(news, null, 2));
  console.log("✅ Saved news data to news.json");

  await browser.close();
};

scrapeNews();
