import puppeteer from "puppeteer";

const COLUMBIA_SPECTATOR_URL = "https://www.columbiaspectator.com/";
const BARNARD_BULLETIN_URL = "https://barnardbulletin.com/";

async function scrapeNews(url, selector) {
  const browser = await puppeteer.launch({ headless: true }); // Set headless to false for debugging
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    const headlines = await page.evaluate((sel) => {
      const headlineElements = document.querySelectorAll(sel);
      return Array.from(headlineElements).map((el) => el.innerText.trim());
    }, selector);

    return headlines;
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    return []; // Return empty array in case of error
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
  const headlines = await page.evaluate((sel) => {
    const firstHeadline = document.querySelector(sel);
    return firstHeadline ? [firstHeadline.innerText.trim()] : [];
  }, selector);
  return headlines;
}
