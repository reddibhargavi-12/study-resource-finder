import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    console.log('ℹ️  No MONGO_URI provided in environment. Running in graceful offline/in-memory mode (stateless per SRS v1.0).');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 4000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️  MongoDB connection failed: ${error.message}`);
    console.log('ℹ️  Falling back to in-memory/localStorage sync mode. Demo will continue running smoothly without interruptions.');
    isConnected = false;
    return false;
  }
};

export const getDBStatus = () => ({
  connected: isConnected,
  mode: isConnected ? 'MongoDB Atlas' : 'In-Memory / Browser LocalStorage (Free Tier Demo Mode)'
});
