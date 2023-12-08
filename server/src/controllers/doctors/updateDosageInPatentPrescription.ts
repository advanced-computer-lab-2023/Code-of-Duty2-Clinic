import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { Response } from "express";
import { updateMedicineAndDosage } from "../../services/prescriptions";

export const updateMedicineAndDosageHandler = async (
   req: AuthorizedRequest,
   res: Response
) => {
   try {
      const { prescriptionId, medicineId } = req.params;
      const { updatedMedicineId, updatedDosage } = req.body;

      const updatedPrescription = await updateMedicineAndDosage(
         prescriptionId,
         medicineId,
         {
            medicineId: updatedMedicineId,
            dosage: updatedDosage,
         }
      );

      res.json(updatedPrescription);
   } catch (error: any) {
      res.status(500).json({ error: error.message });
   }
};
