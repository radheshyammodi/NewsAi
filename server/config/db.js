import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongoose Connected")
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
