import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserRole } from "../types/UserRole";
import { AuthorizedRequest } from '../types/AuthorizedRequest';


export const authorizeUser = (role: UserRole) => {
  return (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role == undefined || role !== req.user.role) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not authorized to access this resource' });
    }
    next();
  };
}