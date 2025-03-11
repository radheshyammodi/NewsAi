import express from "express"
import { fetchNewsByCategory, Preferences } from "../controllers/newsController.js"

const newsRoutes = express.Router()

newsRoutes.post('/preferences/:id', Preferences)
newsRoutes.get('/news/:category', fetchNewsByCategory)


export default newsRoutes