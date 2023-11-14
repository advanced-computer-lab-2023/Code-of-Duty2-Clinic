import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { subscribeToHealthPackageService } from "../../services/patients";
import PaymentMethod from "../../types/PaymentMethod";

export const subscribeToHealthPackage = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const packageId = req.params.packageId;
  const patientId = req.user?.id!;
  const paymentMethod =
    req.query?.paymentMethod === "wallet"
      ? PaymentMethod.WALLET
      : PaymentMethod.CREDIT_CARD;
  try {
    await subscribeToHealthPackageService(patientId, packageId, paymentMethod);
    res.status(200).json({ message: "Subscription added successfully" });
  } catch (error: any) {
    console.error("Error subscribing to health package:", error);
    res.status(400).json({ message: error.message });
  }
};
