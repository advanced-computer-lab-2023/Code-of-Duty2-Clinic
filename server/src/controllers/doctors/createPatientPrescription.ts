import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import { createPrescription } from "../../services/prescriptions";

export const createPatientPrescriptionHandler = async (
   req: AuthorizedRequest,
   response: Response
) => {
   if (!req.user?.id) return response.status(StatusCodes.FORBIDDEN);
   try {
      const { patientId } = req.params;
      const prescriptionData = { patientId, ...req.body };
      const newPrescription = await createPrescription({
         ...req.body,
         patientId,
      });
      response.status(StatusCodes.CREATED).send(newPrescription);
   } catch (error: any) {
      response.status(500).json({ error: error.message });
   }
};
