import { Schema } from "mongoose";
import Relation from "./enums/Relation";

export interface RegisteredFamilyMember{
    id: Schema.Types.ObjectId;
    relation: Relation;
}