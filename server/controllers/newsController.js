import News from "../model/News.js";
import User from "../model/User.js";
import axios from "axios";

export const Preferences = async (req, res) => {
  try {
    const { id } = req.params;
    const { preferences } = req.body;
    const user = await User.findById(id);
    user.preferences = [...user.preferences, ...preferences];
    await user.save();
    res.status(200).json({
      message: "Preferences save successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const fetchNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 0 } = req.query;
    const pageSize = 10;

    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?page=${page}&pageSize=${pageSize}&category=${category}&language=en&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!response.data.articles.length) {
      return res.status(404).json({
        message: "No news found for this category ",
      });
    }

    res.status(200).json({
      length: response.data.articles.length,
      news: response.data.articles,
      nextPage:
        response.data.articles.length === pageSize ? Number(page) + 1 : null,
    });
  } catch (error) {
    console.error(
      "Error fetching news:",
      error.response?.data || error.message
    );
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const fetchAllNews = async (req, res) => {
  const { limit = 10, page = 1, keyword } = req.query;
  const query = keyword
    ? {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { content: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { author: { $regex: keyword, $options: "i" } },
          { url: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};

  try {
    const news = await News.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((page - 1) * limit);
    if (!news) {
      return res.status(400).json({
        message: "No News Found",
      });
    }

    const totalCount = await News.countDocuments(query);

    res.status(200).json({
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      length: news.length,
      data: news,
    });
  } catch (error) {}
};
