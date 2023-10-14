import mongoose, { Document, Schema } from 'mongoose';
import { IMedicine } from './interfaces/IMedicine';

export interface IMedicineModel extends IMedicine, Document {}

export const MedicineSchema = new Schema<IMedicineModel>({
    name: { type: String, required: true, unique: true, index: true },
    activeIngredients: { type: [String], required: true },
    price: { type: Number, required: true, min: 0 },
    availableQuantity: { type: Number, required: true },
    pictureUrl: { type: String },
    description: { type: String },
    usages: { type: [String] },
    isOverTheCounter: { type: Boolean },
    isArchived: { type: Boolean }
}, 
    { timestamps: true }
);

export default mongoose.model<IMedicineModel>('Medicine', MedicineSchema);