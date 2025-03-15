import { GoogleGenerativeAI } from "@google/generative-ai";
import puppeteer from "puppeteer";
import NewsSummary from "../model/NewsSummary.js";
import dotenv from "dotenv"

dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateSummary = async (content) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const response = await model.generateContent(
    `Please summarize these content ${content}`
  );
  return response.response.text();
};

export const newsSummarize = async (req, res) => {
  const { url } = req.body;

  const exist = await NewsSummary.findOne({url})

  if(exist){
    return res.status(200).json({
      summary: exist.summary,
      fullarticle:url
    })
  }

  let browser;

  try {
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const extractedText = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("p"))
        .map((p) => p.innerText)
        .join("");
    });

    await browser.close();

    const summary = await generateSummary(extractedText);
    const newSSummary = new NewsSummary({
      url,
      summary,
    });

    await newSSummary.save();

    res.status(200).json({
      summary,
      fullarticle: url,
    });
  } catch (error) {}
};
