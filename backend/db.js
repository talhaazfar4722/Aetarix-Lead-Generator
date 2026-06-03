import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Build MongoDB connection URI from environment variables
const getMongoDBUri = () => {
  // Prefer full MONGODB_URI from env
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }
  
  // Fallback: build from individual credentials
  if (process.env.MONGODB_PASSWORD) {
    return `mongodb+srv://talhaazfar:${process.env.MONGODB_PASSWORD}@cluster0.sl1gjec.mongodb.net/?appName=Cluster0`;
  }
  
  return null;
};

const uri = getMongoDBUri();

if (!uri) {
  throw new Error('MongoDB connection string not configured. Set MONGODB_URI or MONGODB_PASSWORD in .env file');
}

mongoose.connect(uri, { 
  dbName: process.env.MONGODB_DB || undefined,
  retryWrites: true,
  w: 'majority'
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

export default mongoose;
