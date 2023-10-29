import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../configurations/config';
import { StatusCodes } from 'http-status-codes';

type AuthenticatedRequest = Request & { userId: string };

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authorization header is missing' });
  }

  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token is missing' });
  }

  try {
    const decodedToken = jwt.verify(accessToken, config.server.auth.accessTokenSecret) as unknown as { userId: string };
    req.userId = decodedToken.userId;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token has expired', redirectTo: '/refresh' });
    }
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access token is invalid' });
  }
};

