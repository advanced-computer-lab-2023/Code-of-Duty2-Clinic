import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import { removeUser } from "../../services/users";

async function removeUserHandler(req: Request, res: Response) {
  try {
    const { username, type } = req.body;

    const removedUser = await removeUser(username, type);

    res
      .status(StatusCodes.OK)
      .json({
        message: `User has been succesfully deleted`,
      });
  } catch (error: any) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}

export default removeUserHandler;
