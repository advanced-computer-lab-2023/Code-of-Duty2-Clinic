import {
  addWallet,
  authenticateWalletUser,
  getWallet,
  updateWalletBalance,
} from "..";
import UserRole from "../../../../types/UserRole";

export const authenticateWalletPatient = async (
  patientId: string,
  walletPinCode: string
) => await authenticateWalletUser(patientId, UserRole.PATIENT, walletPinCode);

export const getPatientWallet = async (patientId: string) => {
  const wallet = await getWallet(patientId, UserRole.PATIENT);
  return wallet;
};

export const AddPatientAWallet = async (
  patientId: string,
  desiredCurrency: string,
  pinCode: string
) => {
  await addWallet(patientId, UserRole.PATIENT, desiredCurrency, pinCode);
};

export const performWalletTransaction = async (
  patientId: string,
  transactionAmount: number
) => {
  await updatePatientWalletBalance(patientId, -transactionAmount);
};

export const rechargePatientWallet = async (
  patientId: string,
  transactionAmount: number
) => {
  await updatePatientWalletBalance(patientId, transactionAmount);
};

const updatePatientWalletBalance = async (
  patientId: string,
  transactionAmount: number
) => {
  await updateWalletBalance(patientId, UserRole.PATIENT, transactionAmount);
};
