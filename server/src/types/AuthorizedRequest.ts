import { Request } from "express";
import { ROLE } from "./Role";

export interface AuthorizedRequest extends Request {
    user?: {
      id: string;
      role: ROLE;
    };
}