import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../../../types/AuthorizedRequest";
import { Response } from "express";
import {
  acceptFollowUpRequestForDependentPatient,
  createFollowUpRequestForDependentPatient,
  deleteFollowUpRequestForDependentPatient,
  getFollowUpRequestsForDependentPatient,
  rejectFollowUpRequestForDependentPatient
} from "../../../../services/appointments/follow-ups/for-dependent-patients";
import IFollowUpAppointmentRequestForDependentPatient from "../../../../models/appointments/interfaces/follow-ups/IFollowUpAppointmentRequestForDependentPatient";

export const getFollowUpRequestsForDependentHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user!.id;
  try {
    const followUpRequests = await getFollowUpRequestsForDependentPatient(patientId);
    res.status(StatusCodes.OK).json(followUpRequests);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const deleteFollowUpRequestForDependentHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { followUpRequestId } = req.params;
  if (!followUpRequestId) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Missing required fields" });
  }
  try {
    await deleteFollowUpRequestForDependentPatient(followUpRequestId);
    res.status(StatusCodes.OK).send();
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const createFollowUpRequestForDependentHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user!.id;
  const { dependentNationalId, doctorId, timePeriod, reason } = req.body;
  if (!patientId || !dependentNationalId || !doctorId || !timePeriod || !reason) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Missing required fields" });
  }
  try {
    await createFollowUpRequestForDependentPatient({
      patientId,
      dependentNationalId,
      doctorId,
      timePeriod,
      reason
    } as IFollowUpAppointmentRequestForDependentPatient);
    res.status(StatusCodes.CREATED).send();
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const rejectFollowUpRequestForDependentHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { followUpRequestId } = req.params;
  if (!followUpRequestId) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Missing required fields" });
  }
  try {
    await rejectFollowUpRequestForDependentPatient(followUpRequestId);
    res.status(StatusCodes.OK).send();
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const acceptFollowUpRequestForDependentHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { followUpRequestId } = req.params;
  const { timePeriod } = req.body;
  if (!followUpRequestId) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "Missing required fields" });
  }
  try {
    await acceptFollowUpRequestForDependentPatient(followUpRequestId, timePeriod);
    res.status(StatusCodes.OK).send();
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};
