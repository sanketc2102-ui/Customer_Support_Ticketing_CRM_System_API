import "dotenv/config";
import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ MongoDB Connection established");
  } catch (err) {
    console.err(err);
    console.log("❌ mongoDB connection failed");
    process.exit(1);
  }
}

export default connectDB;
