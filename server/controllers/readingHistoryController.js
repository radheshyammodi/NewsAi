import User from "../model/User.js";

export const getReadingHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      data: user.readingHistory,
    });
  } catch (error) {}
};

export const clearReadingHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    user.readingHistory = [];
    await user.save();

    res.status(200).json({
      message: "History cleared",
    });
  } catch (error) {}
};

export const addReadingHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { article } = req.body;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    user.readingHistory = user.readingHistory.filter(
      (rh) => rh.url !== article.url
    );
    user.readingHistory.unshift(article);

    if (user.readingHistory > 50) {
      user.readingHistory.pop();
    }
    await user.save();

    res.status(201).json({
      message: "reading history saved",
    });
  } catch (error) {}
};
