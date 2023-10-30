import config from "../configurations";
import { ROLE } from "../types/Role";
import jwt from 'jsonwebtoken';

export const signAndGetAccessToken = (id: string, role: ROLE) => {
    return jwt.sign({ id, role }, config
        .server.auth.accessTokenSecret, 
        { expiresIn: config.server.auth.accessTokenExpirationTime });
}

export const signAndGetRefreshToken = (id: string, role: ROLE) => {
    return jwt.sign({ id, role }, config
        .server.auth.refreshTokenSecret, 
        { expiresIn: config.server.auth.refreshTokenExpirationTime });
}

export const verifyAndDecodeAccessToken = (accessToken: string) => {
    return jwt.verify(accessToken, config.server.auth.accessTokenSecret) as { id: string, role: ROLE };
}

export const verifyAndDecodeRefreshToken = (refreshToken: string) => {
    return jwt.verify(refreshToken, config.server.auth.refreshTokenSecret) as { id: string, role: ROLE };
}