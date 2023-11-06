import mongoose from 'mongoose';
import config from '../configurations';

const connectToDB = async () => {
  try {
    console.log("connecting to db");
    
    await mongoose.connect(config.mongo.uri);
    console.log('MongoDB is now connected.');
  } catch (err) {
    console.error(err);
  }
};

export default connectToDB;