import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';

// User Config
const UserSchema = new mongoose.Schema({
    email:{type:String, validate: [ isEmail, 'invalid email' ], unique: true},
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, required: true, enum: ['patient', 'doctor', 'pharmacist', 'admin'] },
});

export const UserModel = mongoose.model('User', UserSchema);


export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);