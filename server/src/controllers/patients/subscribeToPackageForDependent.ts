import { Request, Response } from "express";
import PatientModel from "../../models/patients/Patient";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { setSubscribedPackageForDependentService } from "../../services/patients";
import { StatusCodes } from "http-status-codes";
import PaymentMethod from "../../types/PaymentMethod";

// Controller function to set the subscribed package for a dependent family member
export async function setSubscribedPackageForDependent(
  req: AuthorizedRequest,
  res: Response
) {
  const { dependentNid, packageId } = req.params;
  const patientId = req.user?.id!;

  const paymentMethod =
    req.query?.paymentMethod === "wallet"
      ? PaymentMethod.WALLET
      : PaymentMethod.CREDIT_CARD;
  try {
    await setSubscribedPackageForDependentService(
      patientId,
      dependentNid,
      packageId,
      paymentMethod
    );
    res
      .status(StatusCodes.OK)
      .json({ message: "Subscribed package set for dependent family member" });
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
}
