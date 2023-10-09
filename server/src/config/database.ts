import mongoose from 'mongoose';
import config from './config';

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://code_of_duty:CodeOfDutyReallySecretPassword2023@cluster0.1m0vkjn.mongodb.net/?retryWrites=true&w=majority');
    console.log('MongoDB is now connected.');
  } catch (err) {
    console.error(err);
  }
};

export default connectToDB;