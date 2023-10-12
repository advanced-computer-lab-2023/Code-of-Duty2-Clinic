import { Request, Response } from 'express';
import ClinicAdmin from '../../models/admins/Admin';
import bcrypt from 'bcrypt';

async function registerAdmin(req: Request, res: Response) {
  try {
    const { username, password } = req.body; // Assuming username and password are sent in the request body

    // Check if an admin with the same username already exists
    const existingAdmin = await ClinicAdmin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this username already exists' });
    }

     const saltRound=10;
     const hashedPassword= await bcrypt.hash(password,saltRound)

    // Create a new admin
    const newAdmin = new ClinicAdmin({ username,password: hashedPassword });
    await newAdmin.save();

    return res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

export default registerAdmin ;