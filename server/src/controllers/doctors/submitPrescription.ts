import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import { findMostRecentCompletedAppointment } from "../../services/appointments";
import { Schema } from "mongoose";
import { submitPrescription } from "../../services/prescriptions";
import { submitDependentPrescription } from "../../services/prescriptions/dependentPatient";
import { findCompletedDependentPatientAppointment } from "../../services/doctors";

export const submitPrescriptionHandler = async (req: AuthorizedRequest, res: Response) => {
  const doctorId = req.user?.id;
  if (!doctorId)
    return res.status(StatusCodes.FORBIDDEN).send("UNAUTHORIZED to access this resource");

  const { patientId, dependent } = req.body;
  const { prescriptionId } = req.params;
  try {
    if (dependent) {
      const allowedToViewPatient = await findCompletedDependentPatientAppointment(
        doctorId,
        patientId
      );
      if (!allowedToViewPatient)
        return res.status(StatusCodes.FORBIDDEN).send("Not allowed to access this resource");

      await submitDependentPrescription(prescriptionId);
    } else {
      const allowedToViewPatient = await findMostRecentCompletedAppointment(doctorId, patientId);
      if (!allowedToViewPatient)
        return res.status(StatusCodes.FORBIDDEN).send("Not allowed to access this resource");

      await submitPrescription(prescriptionId);
    }

    res.status(StatusCodes.OK).send("Prescription Updated Successfully");
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send("Prescription Submission Failed");
  }
};
