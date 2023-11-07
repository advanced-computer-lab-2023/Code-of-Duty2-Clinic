import mongoose from 'mongoose';
import config from '../configurations';

const connectToDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    
    await mongoose.connect(config.mongo.uri);
    console.log('MongoDB connection established');
  } catch (err) {
    console.error(err);
  }
};

export default connectToDB;