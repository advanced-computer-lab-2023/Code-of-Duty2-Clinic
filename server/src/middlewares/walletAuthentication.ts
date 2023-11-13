import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyAndDecodeWalletToken } from "../utils/jwt";
import { AuthorizedRequest } from "../types/AuthorizedRequest";
import { User } from "../types/User";

export const authenticateWalletUser = async (
  req: AuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  const walletToken = req.cookies?.walletToken;
  if (!walletToken)
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ message: "Wallet token not found" });
  try {
    const user: User = verifyAndDecodeWalletToken(walletToken);
    if (!user || user.id !== req.user!.id || user.role !== req.user!.role) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Invalid wallet token" });
    }
    next();
  } catch (error: any) {
    res.clearCookie("walletToken", { httpOnly: true });
    res.status(StatusCodes.FORBIDDEN).json({ message: error.message });
  }
};
