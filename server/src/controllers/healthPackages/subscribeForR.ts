import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { subscribeToHealthPackageService } from "../../services/patients";
import { StatusCodes } from "http-status-codes";
import PaymentMethod from "../../types/PaymentMethod";

export const subscribeToHealthPackageR = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const payingPatientId = req.user?.id!;
  const { packageId } = req.params;
  const paidPatientId = req.params?.patientId;
  const paymentMethod =
    req.query?.paymentMethod === "wallet"
      ? PaymentMethod.WALLET
      : PaymentMethod.CREDIT_CARD;
  try {
    await subscribeToHealthPackageService(
      payingPatientId,
      paidPatientId,
      packageId,
      paymentMethod
    );
    res
      .status(StatusCodes.OK)
      .json({ message: "Subscription added successfully" });
  } catch (error: any) {
    console.error("Error subscribing to health package:", error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
