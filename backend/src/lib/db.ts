import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`Connected to MongoDB at: ${conn.connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("MongoDB connection error:", error.message);
    } else {
      console.error("Unknown MongoDB connection error occurred");
    }
    process.exit(1);
  }
};