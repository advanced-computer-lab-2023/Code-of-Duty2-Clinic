import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { Response } from "express";
import { updateMedicineAndDosage } from "../../services/prescriptions";

export const updateMedicineAndDosageHandler = async (req: AuthorizedRequest, res: Response) => {
   try {
      const { prescriptionId, medicineId } = req.params;
      const { updatedMedicineId, dosage, quantity } = req.body;

      const updatedPrescription = await updateMedicineAndDosage(prescriptionId, medicineId, {
         medicineId: updatedMedicineId,
         dosage,
         quantity,
      });
      console.log(updatedPrescription);
      res.json(updatedPrescription);
   } catch (error: any) {
      console.log(error);
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
   }
};
