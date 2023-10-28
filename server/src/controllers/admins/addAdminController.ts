import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createNewAdmin, findAdminByUsername } from '../../services/admins';

async function registerAdmin(req: Request, res: Response) {
  try {
    const { username, password } = req.body; // Assuming username and password are sent in the request body

    // Check if an admin with the same username already exists
    const existingAdmin = await findAdminByUsername(username);
    if (existingAdmin) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Admin with this username already exists' });
    }

    await createNewAdmin(username, password);

    return res.status(StatusCodes.CREATED).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

export default registerAdmin ;