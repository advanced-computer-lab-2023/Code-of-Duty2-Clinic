import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import { createPrescription } from "../../services/prescriptions";
import { hasAppointmentsWithPatient } from "../../services/appointments";

export const createPatientPrescriptionHandler = async (req: AuthorizedRequest, res: Response) => {
   const doctorId = req.user?.id;
   if (!doctorId) return res.status(StatusCodes.FORBIDDEN);

   try {
      const { patientId } = req.params;

      const allowedToViewPatient = await hasAppointmentsWithPatient(doctorId, patientId);
      if (!allowedToViewPatient)
         return res.status(StatusCodes.FORBIDDEN).send("Not allowed to see patient info");

      const prescriptionData = { patientId, ...req.body };
      const newPrescription = await createPrescription({
         ...req.body,
         doctorId,
         patientId,
         isSubmitted: false,
         status: "unfilled",
      });
      res.status(StatusCodes.CREATED).send(newPrescription);
   } catch (error: any) {
      res.status(500).json({ error: error.message });
   }
};
