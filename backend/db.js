import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Build MongoDB connection URI from environment variables
const getMongoDBUri = () => {
  // Option 1: Full MONGODB_URI provided
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }
  
  // Option 2: Build from individual components
  const user = process.env.MONGODB_USER || 'talhaazfar';
  const password = process.env.MONGODB_PASSWORD;
  const cluster = process.env.MONGODB_CLUSTER || 'cluster0.sl1gjec.mongodb.net';
  const appName = process.env.MONGODB_APPNAME || 'Cluster0';
  
  if (!password) {
    return null;
  }
  
  return `mongodb+srv://${user}:${password}@${cluster}/?appName=${appName}`;
};

const uri = getMongoDBUri();

if (!uri) {
  throw new Error('MongoDB connection string not configured. Set MONGODB_URI or MONGODB_PASSWORD in .env file');
}

mongoose.connect(uri, { 
  dbName: process.env.MONGODB_DB || 'maps_leads',
  retryWrites: true,
  w: 'majority'
})
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

export default mongoose;
