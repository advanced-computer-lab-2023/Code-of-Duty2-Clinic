import mongoose from 'mongoose';
import config from './config';

const MongoURI: string = process.env.MONGO_URI as string;

const connectToDB = async () => {
  try {
    await mongoose.connect(config.mongo.config);
    console.log('MongoDB is now connected.');
  } catch (err) {
    console.error(err);
  }
};

export default connectToDB;