import { Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { removeUser } from '../../services/users';

async function removeUserHandler(req: Request, res: Response) {
  try {
    const { username, Type } = req.body;
    
    const removedUser = await removeUser(username, Type);

    res.status(StatusCodes.OK).json({ message:  `User with id ${removedUser._id} removed successfully` });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error' });
  }
}

export default removeUserHandler;