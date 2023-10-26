import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ROLE } from '../utils/userRoles';

type AuthorizedRequest = Request & { userId: string, userRole: ROLE }

export const authorizeUser = (role: ROLE) => {
  return (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    if (!req.userRole || role !== req.userRole) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not authorized to access this resource' });
    }
    next();
  };
};
