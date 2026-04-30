import mongoose from "mongoose";

let connected = false

const connectDB = async () => {
    mongoose.set('strictQuery', true)

    // Check if database is already connected
    if (connected) {
        console.log("MongoDB is already connected.")
        return
    }

    try {
        console.log("Connecting...")
        await mongoose.connect(process.env.MONGODB_URI)
        connected = true
    } catch (error) {
        console.log("Error: ", error);
    }

    console.log("Is connected: ", connected);
}

export default connectDB;