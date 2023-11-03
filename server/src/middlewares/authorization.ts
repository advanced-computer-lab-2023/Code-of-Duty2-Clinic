import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ROLE } from "../types/Role";
import { AuthorizedRequest } from '../types/AuthorizedRequest';


export const authorizeUser = (role: ROLE) => {
  return (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role == undefined || role !== req.user.role) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not authorized to access this resource' });
    }
    console.log('Authorized')
    next();
  };
}