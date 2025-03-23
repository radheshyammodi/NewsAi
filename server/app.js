import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import newsRoutes from "./routes/newsRoutes.js";
import bookmarksRoutes from "./routes/bookmarksRoutes.js";
import readingHistoryRoutes from "./routes/readingHistoryRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import axios from "axios";
import morgan from 'morgan';
import News from "./model/News.js";
import cron from "node-cron"
import admin from "firebase-admin"
import serviceAccount from "./key/shopping-project-48c0e-firebase-adminsdk-fbsvc-d1eb020b5b.json" with {type:"json"}

const app = express();
morgan('combined');
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.json());
dotenv.config();

dbConnect();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const countries = ["us", "uk", "fr", "in", "it"];
const categories = [
  "health",
  "science",
  "technology",
  "sports",
  "entertainment",
  "politics",
  "business",
];

const fetchNewsAndStore = async () => {
  for (let country of countries) {
    for (let category of categories) {
      const { data } = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${process.env.NEWS_API_KEY}`
      );
      if (data.articles && data.articles.length > 0) {
        for (let d of data.articles) {
          const exist = await News.findOne({ title: d.title });
          if (!exist) {
            const newData = await News.create({
              content: d.content,
              title: d.title,
              author: d.author,
              description: d.description,
              url: d.url,
              urlToImage: d.urlToImage,
              category,
              publishedAt: d.publishedAt,
              country,
              source: {
                id: d.source.id,
                name: d.source.name,
              },
            });
            console.log(`Inserted ${d.title} [${category}-${country}]`);
          } else {
            console.log(`Already exists ${d.title}`);
          }
        }
      }
      else{
        console.log('no data found')
      }
    }
  }
};

// fetchNewsAndStore();

cron.schedule('*/15 * * * *', fetchNewsAndStore)

app.use("/auth", userRoutes);
app.use("/api", newsRoutes);
app.use("/api", bookmarksRoutes);
app.use("/api", readingHistoryRoutes);
app.use("/api", aiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on the Port ${process.env.PORT}`);
});
