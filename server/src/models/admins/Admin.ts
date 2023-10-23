import mongoose, { Document, Schema } from 'mongoose';


export const AdminSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref:'User', required: true, unique: true},
}, 
{timestamps: true}
);


export default mongoose.model('Admin', AdminSchema);