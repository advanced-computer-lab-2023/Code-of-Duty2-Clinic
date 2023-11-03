import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { signAndGetAccessToken, verifyAndDecodeRefreshToken } from '../../utils/jwt';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';

export const refreshAccessToken = (req: AuthorizedRequest, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Refresh token is missing' });
  }

  try {
    const decodedToken = verifyAndDecodeRefreshToken(refreshToken);
    const accessToken = signAndGetAccessToken(decodedToken);
    res.status(StatusCodes.OK).json({ accessToken });
  } catch (error) {
    res.clearCookie("refreshToken", { httpOnly: true });
    req.user = undefined;
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Refresh token is invalid' });
  }
};