import mongoose from 'mongoose';
import config from './config';

const connectToDB = async () => {
  try {
    await mongoose.connect(config.mongo.uri);
    console.log('MongoDB is now connected.');
  } catch (err) {
    console.error(err);
  }
};

export default connectToDB;