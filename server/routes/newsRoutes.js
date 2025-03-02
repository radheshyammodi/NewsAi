import express from "express"
import { Preferences } from "../controllers/newsController.js"

const newsRoutes = express.Router()

newsRoutes.post('/preferences/:id', Preferences)


export default newsRoutes