import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import { createPrescription } from "../../services/prescriptions";
import { findMostRecentCompletedAppointment } from "../../services/appointments";
import { findCompletedDependentPatientAppointment } from "../../services/doctors";
import { createDependentPrescription } from "../../services/prescriptions/dependentPatient";

export const createPatientPrescriptionHandler = async (req: AuthorizedRequest, res: Response) => {
  const doctorId = req.user?.id;
  if (!doctorId) return res.status(StatusCodes.FORBIDDEN);

  try {
    const { patientId } = req.params;
    const supervisingPatientId = req.body.supervisingPatientId;
    const prescriptionData = { patientId, ...req.body };
    var newPrescription;
    if (supervisingPatientId) {
      const allowedToViewPatient = await findCompletedDependentPatientAppointment(
        doctorId,
        patientId
      );
      if (!allowedToViewPatient)
        return res.status(StatusCodes.FORBIDDEN).send("Not allowed to see patient info");

      newPrescription = await createDependentPrescription({
        ...req.body,
        doctorId,
        patientNationalId: patientId,
        supervisingPatientId,
        isSubmitted: false,
        status: "unfilled"
      });
    } else {
      const allowedToViewPatient = await findMostRecentCompletedAppointment(doctorId, patientId);
      if (!allowedToViewPatient)
        return res.status(StatusCodes.FORBIDDEN).send("Not allowed to see patient info");

      newPrescription = await createPrescription({
        ...req.body,
        doctorId,
        patientId,
        isSubmitted: false,
        status: "unfilled"
      });
    }

    res.status(StatusCodes.CREATED).send(newPrescription);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
