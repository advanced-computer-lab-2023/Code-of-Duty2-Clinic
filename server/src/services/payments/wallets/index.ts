import UserRole from "../../../types/UserRole";
import { entityIdDoesNotExistError } from "../../../utils/ErrorMessages";
import { signAndGetWalletToken } from "../../../utils/jwt";
import { findUserByIdAndRole } from "../../users";
import { IWallet } from "../../../models/wallets/interfaces/IWallet";

export const authenticateWalletUser = async (
  userId: string,
  userRole: UserRole,
  walletPinCode: string
) => {
  const user = await findUserByIdAndRole(userId, userRole, { wallet: 1 });
  if (!user) throw new Error(entityIdDoesNotExistError("User", userId));
  if (!user.wallet) throw new Error("User does not have a wallet");
  const isValidPinCode = await user.verifyWalletPinCode?.(walletPinCode);
  if (!isValidPinCode) throw new Error("Invalid pin code");

  const walletToken = signAndGetWalletToken({ id: userId, role: userRole });
  return walletToken;
};

export const getWallet = async (
  userId: string,
  userRole: UserRole
): Promise<IWallet> => {
  const user = await findUserByIdAndRole(userId, userRole, { wallet: 1 });
  if (!user) throw new Error(entityIdDoesNotExistError("User", userId));
  return user.wallet!;
};

export const addWallet = async (
  userId: string,
  userRole: UserRole,
  desiredCurrency: string,
  pinCode: string
) => {
  const user = await findUserByIdAndRole(userId, userRole, { wallet: 1 });
  if (!user) throw new Error(entityIdDoesNotExistError("User", userId));
  if (user.wallet) throw new Error("User already has a wallet");

  const wallet = {
    currency: desiredCurrency,
    pinCode,
    amount: 0,
  };
  user.wallet = wallet;
  await user.save();
};

export const updateWalletBalance = async (
  userId: string,
  userRole: UserRole,
  transactionAmount: number
) => {
  const user = await findUserByIdAndRole(userId, userRole, { wallet: 1 });
  if (!user) throw new Error(entityIdDoesNotExistError("User", userId));
  if (!user.wallet) throw new Error("User does not have a wallet");
  if (user.wallet.amount + transactionAmount < 0)
    throw new Error("Insufficient funds");
  user.wallet.amount += transactionAmount;
  await user.save();
};
