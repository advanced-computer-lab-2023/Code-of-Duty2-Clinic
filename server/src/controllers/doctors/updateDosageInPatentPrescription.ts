import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { Response } from "express";
import { updateMedicineAndDosage } from "../../services/prescriptions";
import { updateDependentMedicineAndDosage } from "../../services/prescriptions/dependentPatient";

export const updateMedicineAndDosageHandler = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { prescriptionId, medicineId } = req.params;
    const { updatedMedicineId, dosage, quantity,dependent } = req.body;
    var updatedPrescription;
    if (dependent) {
      updatedPrescription = await updateDependentMedicineAndDosage(prescriptionId, medicineId, {
        medicineId: updatedMedicineId,
        dosage,
        quantity
      });
    } else {
      updatedPrescription = await updateMedicineAndDosage(prescriptionId, medicineId, {
        medicineId: updatedMedicineId,
        dosage,
        quantity
      });
    }

    res.json(updatedPrescription);
  } catch (error: any) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
