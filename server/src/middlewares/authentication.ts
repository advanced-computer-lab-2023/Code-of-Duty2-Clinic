import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../configurations/config';
import { StatusCodes } from 'http-status-codes';

type AuthenticatedRequest = Request & { userId: string };

export const authenticateUser = (req: any, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authorization header is missing' });
    return;
  }

  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token is missing' });
    return;
  }

  try {
    const decodedToken = jwt.verify(accessToken, config.server.auth.accessTokenSecret) as unknown as { userId: string };
    req.userId = decodedToken.userId;
    next();
    console.log('Authenticated')
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token has expired', redirectTo: '/refresh' });
      return;
    }
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token is invalid' });
  }
};

