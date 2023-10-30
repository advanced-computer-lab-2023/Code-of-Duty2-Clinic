import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { signAndGetAccessToken, verifyAndDecodeRefreshToken } from '../../utils/jwt';

export const refreshAccessToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Refresh token is missing' });
  }

  try {
    const decodedToken = verifyAndDecodeRefreshToken(refreshToken);
    const accessToken = signAndGetAccessToken(decodedToken.id, decodedToken.role);
    res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    res.clearCookie('refreshToken');
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Refresh token is invalid' });
  }
};