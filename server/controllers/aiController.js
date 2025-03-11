import { GoogleGenerativeAI } from "@google/generative-ai";
import puppeteer from "puppeteer";


const genAI = new GoogleGenerativeAI("AIzaSyBzGukHuPv_ghQ1tumtH3I7k9Yc82HoT9E")


const generateSummary = async(content)=>{
    const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"})

    const response = await model.generateContent(`Please summarize these content ${content}`)
    return response.response.text()
}

export const newsSummarize = async (req, res) => {
  const { url } = req.body;

  console.log(url)

  let browser;

  try {
    browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const extractedText = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("p")).map((p) => 
         p.innerText).join('')
      ;
    });

    const summary = await generateSummary(extractedText)
    res.status(200).json({
        summary, fullarticle:url
    })
      
  } catch (error) {}  
};
