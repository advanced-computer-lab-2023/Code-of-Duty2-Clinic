import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { authenticatePatientOrAdmin } from "../../services/auth";

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if(! username || ! password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Username and password are required' });
    }
    try {
        const { accessToken, refreshToken, role } = await authenticatePatientOrAdmin(username, password);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, path: '/' });
        res.status(StatusCodes.OK).json({ accessToken, role });   
    } catch(error) {
        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}