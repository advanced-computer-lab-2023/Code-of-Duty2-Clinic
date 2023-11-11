import { Response } from "express";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import {
  AddDoctorAWallet,
  authenticateWalletDoctor,
  getDoctorWallet,
  performWalletTransaction,
  rechargeDoctorWallet,
} from "../../../services/payments/wallets/doctors";
import { findDoctorById } from "../../../services/doctors";

export const doesADoctorHaveAWalletHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const doctorId = req.user?.id!;
  const doctor = await findDoctorById(doctorId, { wallet: 1 });
  if (!doctor) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Doctor not found" });
  }
  if (!doctor.wallet) {
    return res.status(StatusCodes.OK).json({ exists: false });
  }
  return res.status(StatusCodes.OK).json({ exists: true });
};

export const authenticateWalletDoctorHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { pinCode } = req.body;
  try {
    const walletToken = await authenticateWalletDoctor(req.user?.id!, pinCode);
    res.cookie("walletToken", walletToken, { httpOnly: true, path: "/" });
    res
      .status(StatusCodes.OK)
      .json({ message: "Wallet is Authenticated successfully" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const rechargeDoctorWalletHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const doctorId = req.user?.id!;
  const { transactionAmount } = req.body;
  try {
    await rechargeDoctorWallet(doctorId, transactionAmount);
    res
      .status(StatusCodes.OK)
      .json({ message: "Wallet recharged successfully" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const getDoctorWalletHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const walletToken = req.cookies?.walletToken;
  if (!walletToken)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Wallet token not found" });

  const doctorId = req.user?.id!;
  try {
    const doctorWallet = await getDoctorWallet(doctorId);
    res.status(StatusCodes.OK).json(doctorWallet);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const addDoctorAWalletHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const doctorId = req.user?.id!;
  const { desiredCurrency, pinCode, confirmPinCode } = req.body;
  if (pinCode !== confirmPinCode) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Pin code and confirm pin code don't match" });
  }
  try {
    await AddDoctorAWallet(doctorId, desiredCurrency, pinCode);
    res.status(StatusCodes.OK).json({ message: "Wallet added successfully" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const performAWalletTransactionHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const doctorId = req.user?.id!;
  const { transactionAmount } = req.body;
  try {
    await performWalletTransaction(doctorId, transactionAmount);
    res.status(StatusCodes.OK).json({ message: "Transaction successful" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
