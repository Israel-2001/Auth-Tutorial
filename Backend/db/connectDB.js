import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDb Connected: ${connect.connection.host}`);
  } catch (err) {
    console.log("Error Connection to the database", err);
    process.exit(1) // 1 is failure, 0 status code is success
  }
}