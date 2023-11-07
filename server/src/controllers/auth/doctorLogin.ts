import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { authenticateDoctor } from "../../services/auth";

export const doctorLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if(! username || ! password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Username and password are required' });
    }
    try {
        const { accessToken, refreshToken, role } = await authenticateDoctor(username, password);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, path: '/' });
        res.status(StatusCodes.OK).json({ accessToken, role });
    }
    catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
}
