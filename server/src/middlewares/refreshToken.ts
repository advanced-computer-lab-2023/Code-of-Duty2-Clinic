import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import config from '../configurations/config';
import { StatusCodes } from 'http-status-codes';
import { ROLE } from '../utils/userRoles';

export const refreshAccessToken = (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Refresh token is missing' });
  }

  try {
    const decodedToken = jwt.verify(refreshToken, config.server.refreshTokenSecret) as { userId: string, role: ROLE };
    const accessToken = jwt.sign({ userId: decodedToken.userId, role: decodedToken.role }, config.server.accessTokenSecret, { expiresIn: '15m' });
    return res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Refresh token is invalid' });
  }
};