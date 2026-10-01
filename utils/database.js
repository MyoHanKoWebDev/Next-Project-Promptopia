import mongoose from "mongoose";

let isConnected = false; // track the connection status

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    // 1. Changed MONGODB_URL -> MONGODB_URI
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      serverSelectionTimeoutMS: 5000, // Fail fast in 5s if IP is blocked or credentials wrong
    });

    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    // 2. MUST throw error so calling functions (like NextAuth signIn) know the connection failed
    throw error;
  }
};