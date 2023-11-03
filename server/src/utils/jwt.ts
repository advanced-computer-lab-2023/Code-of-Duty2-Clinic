import config from "../configurations";
import jwt from 'jsonwebtoken';
import { User } from "../types/User";

export const signAndGetAccessToken = (user: User) => {
    return jwt.sign(user, config
        .server.auth.accessTokenSecret, 
        { expiresIn: config.server.auth.accessTokenExpirationTime });
}

export const signAndGetRefreshToken = (user: User) => {
    return jwt.sign(user, config
        .server.auth.refreshTokenSecret, 
        { expiresIn: config.server.auth.refreshTokenExpirationTime });
}

export const verifyAndDecodeAccessToken = (accessToken: string) => {
    return jwt.verify(accessToken, config.server.auth.accessTokenSecret) as User;
}

export const verifyAndDecodeRefreshToken = (refreshToken: string) => {
    return jwt.verify(refreshToken, config.server.auth.refreshTokenSecret) as User;
}