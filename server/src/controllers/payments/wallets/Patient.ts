import { Response } from "express";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import {
  AddPatientAWallet,
  authenticateWalletPatient,
  getPatientWallet,
  performWalletTransaction,
  rechargePatientWallet,
} from "../../../services/payments/wallets/patients";
import { findPatientById } from "../../../services/patients";

export const doesAPatientHaveAWalletHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  const patient = await findPatientById(patientId, { wallet: 1 });
  if (!patient) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Patient not found" });
  }
  if (!patient.wallet) {
    return res.status(StatusCodes.OK).json({ exists: false });
  }
  return res.status(StatusCodes.OK).json({ exists: true });
};

export const authenticateWalletPatientHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { pinCode } = req.body;
  try {
    const walletToken = await authenticateWalletPatient(req.user?.id!, pinCode);
    res.cookie("walletToken", walletToken, { httpOnly: true, path: "/" });
    res
      .status(StatusCodes.OK)
      .json({ message: "Wallet is Authenticated successfully" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const getPatientWalletHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  try {
    const patientWallet = await getPatientWallet(patientId);
    res.status(StatusCodes.OK).json(patientWallet);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const addPatientAWalletHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  const { desiredCurrency, pinCode, confirmPinCode } = req.body;
  if (pinCode !== confirmPinCode) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Pin code and confirm pin code don't match" });
  }
  try {
    await AddPatientAWallet(patientId, desiredCurrency, pinCode);
    res.status(StatusCodes.OK).json({ message: "Wallet added successfully" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const performAWalletTransactionHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  const { transactionAmount } = req.body;
  try {
    await performWalletTransaction(patientId, transactionAmount);
    res.status(StatusCodes.OK).json({ message: "Transaction successful" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const rechargePatientWalletHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  const { transactionAmount } = req.body;
  try {
    await rechargePatientWallet(patientId, transactionAmount);
    res
      .status(StatusCodes.OK)
      .json({ message: "Wallet recharged successfully" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
