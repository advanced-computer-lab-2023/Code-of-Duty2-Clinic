import { Request } from "express";
import { User } from "./User";

export interface AuthorizedRequest extends Request {
  user?: User;
}
