import express from "express"
import { addBookmark, getBookmarks, removeBookmark } from "../controllers/bookmarksController.js"

const bookmarksRoutes = express.Router()

bookmarksRoutes.get('/:id/bookmarks', getBookmarks)
bookmarksRoutes.post('/:id/bookmarks', addBookmark)
bookmarksRoutes.delete('/:id/bookmarks/:articleId', removeBookmark)


export default bookmarksRoutes