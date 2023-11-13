import { Schema } from "mongoose";
import { Relation } from "../Patient";

export interface IRegisteredFamilyMember{
    id: Schema.Types.ObjectId;
    relation: Relation

}