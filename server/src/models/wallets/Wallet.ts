import { Schema } from "mongoose";
import bcrypt from 'mongoose-bcrypt';
import { IWallet } from "./interfaces/IWallet";

const WalletSchema = new Schema<IWallet>({
    amount: Number,
    currency: {type: String, default: 'EGP'},
    pinCode: {type: String, bcrypt: true},
});
WalletSchema.plugin(bcrypt, { rounds: 10 });

export default WalletSchema;