import { Schema } from "mongoose";

export interface RegisteredFamilyMember{
    id: Schema.Types.ObjectId;
    relation: 'wife' | 'husband' | 'children';
}