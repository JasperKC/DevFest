import puppeteer from "puppeteer";

const COLUMBIA_SPECTATOR_URL = "https://www.columbiaspectator.com/";
const BARNARD_BULLETIN_URL = "https://barnardbulletin.com/";

async function scrapeNews(url, selector) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    const headlines = await page.evaluate((sel) => {
      const headlineElements = document.querySelectorAll(sel);
      return Array.from(headlineElements).map((el) => el.innerText.trim());
    }, selector);

    return headlines;

  let news = [];

  // Scrape the Spectator
  try {
    await page.goto("https://www.columbiaspectator.com/", {
      waitUntil: "networkidle2",
    });
    let specNews = await page.evaluate(() => {
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

    news = [...news, ...specNews];
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return [`Error scraping ${url}: ${error.message}`]; // Return an error message
  } finally {
    await browser.close();
  }
}

export async function getColumbiaSpectatorHeadlines() {
  const selector = "[class*='CDSArticleInfo__HeadlineContainer-sc-7lnjft-1'] a"; // Attribute selector
  return await scrapeNews(COLUMBIA_SPECTATOR_URL, selector);
}

export async function getBarnardBulletinHeadlines() {
  const selector = "h2";
  return await scrapeNews(BARNARD_BULLETIN_URL, selector);
}
    console.error("❌ Error scraping Spectator:", error);
  }

  // Scrape Barnard Bulletin
  try {
    await page.goto("https://www.thebarnardbulletin.com/", {
      waitUntil: "networkidle2",
    });
    let bulletinNews = await page.evaluate(() => {
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

    news = [...news, ...bulletinNews];
  } catch (error) {
    console.error("❌ Error scraping Bulletin:", error);
  }

  console.log("📰 Scraped News:", news);

  // Save to JSON file
  fs.writeFileSync("news.json", JSON.stringify(news, null, 2));
  console.log("✅ Saved news data to news.json");

  await browser.close();
};

scrapeNews();
