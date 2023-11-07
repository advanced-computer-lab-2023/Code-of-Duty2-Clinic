import config from "../configurations";
import jwt from "jsonwebtoken";
import { User } from "../types/User";

export const signAndGetAccessToken = (user: User) => {
  return jwt.sign(user, config.server.auth.accessTokenSecret, {
    expiresIn: config.server.auth.accessTokenExpirationTime,
  });
};

export const signAndGetRefreshToken = (user: User) => {
  return jwt.sign(user, config.server.auth.refreshTokenSecret, {
    expiresIn: config.server.auth.refreshTokenExpirationTime,
  });
};

export const signAndGetPasswordResetToken = (user: User) => {
  return jwt.sign(user, config.server.auth.passwordResetSecret, {
    expiresIn: config.server.auth.passwordResetTokenExpirationTime,
  });
};

export const verifyAndDecodeAccessToken = (accessToken: string) => {
  const decodedUserSessionData = jwt.verify(
    accessToken,
    config.server.auth.accessTokenSecret
  ) as User;
  return { id: decodedUserSessionData.id, role: decodedUserSessionData.role };
};

export const verifyAndDecodeRefreshToken = (refreshToken: string) => {
  const decodedUserSessionData = jwt.verify(
    refreshToken,
    config.server.auth.refreshTokenSecret
  ) as User;
  return { id: decodedUserSessionData.id, role: decodedUserSessionData.role };
};

export const verifyAndDecodePasswordResetToken = (
  passwordResetToken: string
) => {
  const decodedUserSessionData = jwt.verify(
    passwordResetToken,
    config.server.auth.passwordResetSecret
  ) as User;
  return { id: decodedUserSessionData.id, role: decodedUserSessionData.role };
};
