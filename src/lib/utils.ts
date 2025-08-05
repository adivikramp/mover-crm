import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

export const connectDB = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using existing MongoDB connection");
            return;
        }

        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }

        const db = await mongoose.connect(process.env.MONGODB_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};