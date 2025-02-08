import puppeteer from "puppeteer";
import fs from "fs";

const scrapeNews = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  let news = [];

  // Scrape the Spectator
  try {
    await page.goto("https://www.columbiaspectator.com/", {
      waitUntil: "networkidle2",
    });

    let specNews = await page.evaluate(() => {
      let articles = [];
      document
        .querySelectorAll(
          ".CDSBigArticle_BigArticleContainer-sc-lxcqafz-1, .CDSMediumArticle_MediumArticleContainer-sc-ztv0od-0"
        )
        .forEach((article) => {
          let headline =
            article
              .querySelector(".CDSArticleInfo__Headline-sc-7lnjft-2")
              ?.innerText.trim() || "No headline";
          let link = article.querySelector("a")?.href || "#";
          let category =
            article
              .querySelector(".CDSArticleInfo__Section-sc-7lnjft-0")
              ?.innerText.trim() || "General";

          articles.push({ headline, link, category });
        });
      return articles;
    });

    news = [...news, ...specNews];
  } catch (error) {
    console.error("❌ Error scraping Spectator:", error);
  }

  // Scrape Barnard Bulletin
  try {
    await page.goto("https://www.thebarnardbulletin.com/", {
      waitUntil: "networkidle2",
    });

    let bulletinNews = await page.evaluate(() => {
      let articles = [];
      document.querySelectorAll("._HhgCcE").forEach((article) => {
        let headline =
          article.querySelector("h2")?.innerText.trim() || "No headline";
        let link = article.querySelector("a")?.href || "#";

        articles.push({ headline, link, category: "General" }); // No category found in the screenshot
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
