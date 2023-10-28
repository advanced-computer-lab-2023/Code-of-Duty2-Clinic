import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ROLE } from '../utils/userRoles';

type AuthorizedRequest = Request & { userId: string, userRole: ROLE }

export const authorizeUser = (role: ROLE) => {
  return (req: any, res: Response, next: NextFunction): void => {
    if (!req.userRole || role !== req.userRole) {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not authorized to access this resource' });
      return;
    }
    console.log('Authorized')
    next();
  };
};
