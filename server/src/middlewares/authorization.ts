import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import UserRole from "../types/UserRole";

export const authorizeUser = (role: UserRole) => {
  return (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role === undefined || role !== req.user.role) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You are not authorized to access this resource" });
    }
    if (
      role === UserRole.UNVERIFIED_DOCTOR &&
      !req.originalUrl.includes("users")
    ) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "You are not authorized to access this resource" });
    }
    next();
  };
};
