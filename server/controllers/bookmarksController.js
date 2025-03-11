import User from "../model/User.js";

export const addBookmark = async (req, res) => {
  try {
    const { article } = req.body;
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }


    const someArticle = user.bookmarks.some((b) => b.url === article.url);
    if (someArticle) {
      res.status(400).json({
        message: "Already exists",
      });
    }

    user.bookmarks.push(article);
    await user.save();
    res.status(201).json({
      message: "Bookmark Saved",
    });

    console.log(user);
  } catch (error) {}
};



export const getBookmarks = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      data: user.bookmarks,
    });
  } catch (error) {}
};



export const removeBookmark = async (req, res) => {
  try {
    const { id, articleId } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    user.bookmarks = user.bookmarks.filter((b) => b._id.toString() !== articleId);
    await user.save();
    res.status(200).json({
      message: "Bookmarks Removed",
    });
  } catch (error) {}
};
