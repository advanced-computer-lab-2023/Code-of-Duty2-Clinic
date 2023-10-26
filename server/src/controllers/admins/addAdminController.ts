import { Request, Response } from 'express';
import ClinicAdmin from '../../models/admins/Admin';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

async function registerAdmin(req: Request, res: Response) {
  try {
    const { username, password } = req.body; // Assuming username and password are sent in the request body

    // Check if an admin with the same username already exists
    const existingAdmin = await ClinicAdmin.findOne({ username });
    if (existingAdmin) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Admin with this username already exists' });
    }

     const saltRound=10;
     const hashedPassword= await bcrypt.hash(password,saltRound)

    // Create a new admin
    const newAdmin = new ClinicAdmin({ username,password: hashedPassword });
    await newAdmin.save();

    return res.status(StatusCodes.CREATED).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
}

export default registerAdmin ;