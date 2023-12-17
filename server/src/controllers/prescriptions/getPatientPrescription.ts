import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { StatusCodes } from "http-status-codes";
import { getPatientPrescriptionService } from "../../services/prescriptions";

export const getPatientPrescription=async (req:AuthorizedRequest,res:Response)=>{
    const patientId = req.user?.id
    if(!patientId) return res.status(StatusCodes.UNAUTHORIZED).send({message:"not allowed to access this resource"})

    const {prescriptionId} = req.params
    const prescription = await getPatientPrescriptionService(patientId,prescriptionId);

    return res.status(StatusCodes.OK).send(prescription)
}