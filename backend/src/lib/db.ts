import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`Connected to MongoDB at: ${conn.connection.host}`);
  } catch (error: unknown) {
    console.error('Error connecting to MongoDB:', error instanceof Error ? error.message : 'Unknown error');
    process.exit(1);
  }
};