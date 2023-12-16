import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import { hasAppointmentsWithPatient } from "../../services/appointments";
import { getPatientPrescriptionsByDoctor } from "../../services/prescriptions";

export const getPatientPrescriptionsHandler = async (req: AuthorizedRequest, res: Response) => {
   const doctorId = req.user?.id;
   if (!doctorId) return res.status(StatusCodes.FORBIDDEN);
   try {
      const { patientId } = req.params;
      console.log(patientId);
      const { pageSize, lastCreatedAt } = req.query;
      console.log("Query :" + pageSize);
      console.log("Query :" + lastCreatedAt);
      const lastCreatedAtDateObj = new Date(lastCreatedAt as string);
      const allowedToViewPatient = await hasAppointmentsWithPatient(doctorId, patientId);
      if (!allowedToViewPatient)
         return res.status(StatusCodes.FORBIDDEN).send("Not allowed to see patient info");
      const patientPrescriptions = await getPatientPrescriptionsByDoctor(
         doctorId,
         patientId,
         lastCreatedAtDateObj,
         Number(pageSize)
      );

      res.status(StatusCodes.OK).send(patientPrescriptions);
   } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).send("Cannot get prescriptions");
   }
};
