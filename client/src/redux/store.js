import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice.js"
import newsReducer from "./Slices/newsSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer
  },
});

export default store;
