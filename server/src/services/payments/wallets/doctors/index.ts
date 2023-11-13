import {
  addWallet,
  authenticateWalletUser,
  getWallet,
  updateWalletBalance,
} from "..";
import UserRole from "../../../../types/UserRole";

export const authenticateWalletDoctor = async (
  doctorId: string,
  walletPinCode: string
) => await authenticateWalletUser(doctorId, UserRole.DOCTOR, walletPinCode);

export const getDoctorWallet = async (doctorId: string) => {
  const wallet = await getWallet(doctorId, UserRole.DOCTOR);
  return wallet;
};

export const AddDoctorAWallet = async (
  doctorId: string,
  desiredCurrency: string,
  pinCode: string
) => {
  await addWallet(doctorId, UserRole.DOCTOR, desiredCurrency, pinCode);
};

export const performWalletTransaction = async (
  doctorId: string,
  transactionAmount: number
) => {
  await updatedoctorWalletBalance(doctorId, -transactionAmount);
};

export const rechargeDoctorWallet = async (
  doctorId: string,
  transactionAmount: number
) => {
  await updatedoctorWalletBalance(doctorId, transactionAmount);
};

const updatedoctorWalletBalance = async (
  doctorId: string,
  transactionAmount: number
) => {
  await updateWalletBalance(doctorId, UserRole.DOCTOR, transactionAmount);
};
