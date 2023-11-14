import { Schema } from "mongoose";
import bcrypt from "mongoose-bcrypt";
import { IWallet } from "./interfaces/IWallet";

const WalletSchema = new Schema<IWallet>({
  amount: { type: Number, required: true },
  currency: { type: String, default: "EGP", required: true },
  pinCode: { type: String, bcrypt: true, select: false },
});
WalletSchema.plugin(bcrypt, { rounds: 10 });

export default WalletSchema;
