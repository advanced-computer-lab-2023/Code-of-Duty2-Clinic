import { StatusCodes } from "http-status-codes";
import { addMedicineToPrescription } from "../../services/prescriptions";
import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const addMedicineToPatientPrescriptionHandler = async (
   req: AuthorizedRequest,
   res: Response
) => {
   try {
      const { prescriptionId } = req.params;
      const { medicineId, dosage } = req.body;
      const updatedPrescription = await addMedicineToPrescription(
         prescriptionId,
         medicineId,
         dosage
      );
      res.json(updatedPrescription);
   } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).send({ error: error.message });
   }
};
