import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";

export const logout = (req: AuthorizedRequest, res: Response) => {
    res.clearCookie("refreshToken", { httpOnly: true });
    req.user = undefined;
    return res.sendStatus(StatusCodes.OK);
}