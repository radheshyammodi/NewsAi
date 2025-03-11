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
  const { category } = req.params;
  const { page = 0 } = req.query;
  const pageSize = 10;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?page=${page}&pageSize=${pageSize}&category=${category}&language=en&apiKey=${process.env.NEWS_API_KEY}`
    );

  if(!response.data.articles.length){
    return res.status(404).json({
      message:"No news found for this category "
    })
  }

    res.status(200).json({
        length: response.data.articles.length,
        news: response.data.articles,
        nextPage:
          response.data.articles.length === pageSize ? Number(page) + 1 : null,
      });
    
  } catch (error) {
    console.error("Error fetching news:", error.response?.data || error.message)
    res.status(500).json({
      message:"Internal server error"
    })
  }
};
