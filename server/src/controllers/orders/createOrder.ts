import { StatusCodes } from "http-status-codes";
import Medicine from "../../models/medicines/Medicine";
import Order from "../../models/order/Order";
import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { getPatientNameMobilePackage } from "../../services/patients";
import {
   findHealhPackageMedicinesDiscount,
   findHealhPackagePharmacyDiscountAndName,
} from "../../services/health-packages";
import { updatePatientWalletBalance } from "../../services/payments/wallets/patients";
import { updatePrescriptionToPaid } from "../../services/prescriptions";

export const createOrderFromPrescription = async (req: AuthorizedRequest, res: Response) => {
   try {
      const patientId = req.user?.id;
      const { medicines, patientAddress, paymentMethod } = req.body;
      const { prescriptionId } = req.params;
      const patientInfo = await getPatientNameMobilePackage(patientId!)!;

      if (!patientInfo)
         return res.status(StatusCodes.BAD_REQUEST).send({ message: "patient does not exist" });

      const exceedingAvailableQuantityMedicines = [];

      var amount = 0;
      var medcineDiscount = 1;
      if (patientInfo.subscribedPackage) {
         const discount = await findHealhPackageMedicinesDiscount(
            patientInfo.subscribedPackage?.packageId
         );
         medcineDiscount = discount;
      }

      for (const medicine of medicines) {
         const dbMedicine = await Medicine.findById(medicine.medicineId);

         if (!dbMedicine) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: `Medicine with id ${medicine.medicineId} not found`,
            });
         }
         //  console.log(medicine.quantity, "my order");
         //  console.log(dbMedicine.availableQuantity, "avilable nfdsn");
         if (medicine.quantity > dbMedicine.availableQuantity) {
            exceedingAvailableQuantityMedicines.push(dbMedicine.name);
         }
      }

      
      if (exceedingAvailableQuantityMedicines.length > 0) {
         return res.status(StatusCodes.BAD_REQUEST).json({
            message: `The following medicines are out of stock or do not have enough available quantity: ${exceedingAvailableQuantityMedicines.join(
               ", "
            )}. Please wait until available`,
         });
      }

      for (const medicine of medicines) {
         const dbMedicine = (await Medicine.findById(medicine.medicineId))!;
         dbMedicine.availableQuantity = dbMedicine.availableQuantity - medicine.quantity;
         await dbMedicine.save();
         amount += medicine.quantity * dbMedicine.price;
      }
      amount *= medcineDiscount;


      if (paymentMethod === "wallet") updatePatientWalletBalance(patientId!, amount);

      const newOrder = new Order({
         patientId,
         patientName: patientInfo?.name,
         patientAddress,
         patientMobileNumber: patientInfo.mobileNumber,
         medicines,
         paidAmount: amount,
         paymentMethod,
      });

      const savedOrder = await newOrder.save();

      await updatePrescriptionToPaid(prescriptionId);

      return res.status(StatusCodes.CREATED).json("Order isssued successfully ");
   } catch (err) {
      console.log(err);
      return res
         .status(StatusCodes.INTERNAL_SERVER_ERROR)
         .json({ message: (err as Error).message });
   }
};
