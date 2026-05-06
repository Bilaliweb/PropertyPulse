import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  mongoose.set("bufferCommands", false);

  // Reuse existing mongoose connection when available.
  if (connected || mongoose.connection.readyState === 1) {
    connected = true;
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    connected = true;
  } catch (error) {
    connected = false;
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

export default connectDB;