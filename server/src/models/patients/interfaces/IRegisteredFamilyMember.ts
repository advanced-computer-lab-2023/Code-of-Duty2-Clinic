import { Schema } from "mongoose";

export interface IRegisteredFamilyMember{
    id: Schema.Types.ObjectId;
    relation: 'wife' | 'husband' | 'children';
}