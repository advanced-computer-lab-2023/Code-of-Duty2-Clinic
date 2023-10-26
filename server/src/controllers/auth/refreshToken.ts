import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../../configurations/config';
import { StatusCodes } from 'http-status-codes';
import { ROLE } from '../../utils/userRoles';

export const refreshAccessToken = (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Refresh token is missing' });
  }

  try {
    const decodedToken = jwt.verify(refreshToken, config.server.auth.refreshTokenSecret) as { userId: string, userRole: ROLE };
    const accessToken = jwt.sign({ userId: decodedToken.userId, userRole: decodedToken.userRole }, config.server.auth.accessTokenSecret, { expiresIn: config.server.auth.accessTokenExpirationTime });
    return res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Refresh token is invalid' });
  }
};