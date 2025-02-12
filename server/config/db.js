import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect("mongodb://localhost:27017/news");
    console.log("Mongoose Connected")
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
