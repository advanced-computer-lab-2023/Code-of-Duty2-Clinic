import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import { VerificationStatus } from "../types/VerficationStatus";
import UserRole from "../types/UserRole";

export const authorizeUser = (role: UserRole) => {
  return (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    if (!req.user?.role || role !== req.user.role) {
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
