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
          ".CDSBigArticle__BigArticleContainer-sc-1xcgafz-1, .CDSMediumArticle__MediumArticleContainer-sc-ztv0od-0"
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
              ?.innerText.trim() || "GENERAL";

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
      document.querySelectorAll("a.o16KGI").forEach((article) => {
        // Select <a> tags with class "o16KGI"
        let headline =
          article.querySelector("h2")?.innerText.trim() || "No headline"; // h2 is a direct child of <a>
        let link = article.href || "#"; // The href is directly on the <a> tag
        articles.push({ headline, link, category: "GENERAL" });
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