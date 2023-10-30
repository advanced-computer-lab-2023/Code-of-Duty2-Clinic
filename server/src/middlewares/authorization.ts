import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ROLE } from "../types/Role";
import { AuthorizedRequest } from '../types/AuthorizedRequest';


export const authorizeUser = (role: ROLE) => {
  return (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role == undefined || role !== req.user.role) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not authorized to access this resource' });
    }
    const userIdParamsKey = getUserIdParamsKey(role);
    console.log(req.user, req.params);
    console.log(userIdParamsKey);
    if(!!req.params[userIdParamsKey] && req.user.id !== req.params[userIdParamsKey]) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'You are not authorized to access this resource' });
    };
    console.log('Authorized')
    next();
  };
}

const getUserIdParamsKey = (role: ROLE) => { 
  switch (role) {
    case ROLE.ADMIN:
      return 'adminId';
    case ROLE.DOCTOR:
      return 'doctorId';
    case ROLE.PATIENT:
      return 'patientId';
    default:
      return '';
  }
}