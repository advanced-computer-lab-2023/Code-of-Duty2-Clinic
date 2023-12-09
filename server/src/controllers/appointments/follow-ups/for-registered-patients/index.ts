import { StatusCodes } from "http-status-codes";
import IFollowUpAppointmentRequestForRegisteredPatient from "../../../../models/appointments/interfaces/follow-ups/IFollowUpAppointmentRequestForRegisteredPatient";
import {
  acceptFollowUpRequestForRegisteredPatient,
  createFollowUpRequestForRegisteredPatient,
  getFollowUpRequestsForRegisteredPatient,
  rejectFollowUpRequestForRegisteredPatient,
} from "../../../../services/appointments/follow-ups/for-registered-patients";
import { AuthorizedRequest } from "../../../../types/AuthorizedRequest";
import { Response } from "express";

export const getFollowUpRequestsForRegisteredHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.body.patientId || req.user!.id;
  try {
    const followUpRequests = await getFollowUpRequestsForRegisteredPatient(
      patientId
    );
    res.status(StatusCodes.OK).json(followUpRequests);
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const createFollowUpRequestForRegisteredHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.body.patientId || req.user!.id;
  const { doctorId, timePeriod, reason } = req.body;
  if (!patientId || !doctorId || !timePeriod || !reason) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Missing required fields" });
  }
  try {
    await createFollowUpRequestForRegisteredPatient({
      patientId,
      doctorId,
      timePeriod,
      reason,
    } as IFollowUpAppointmentRequestForRegisteredPatient);
    res.status(StatusCodes.CREATED).send();
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const rejectFollowUpRequestForRegisteredHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { followUpRequestId } = req.params;
  if (!followUpRequestId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Missing required fields" });
  }
  try {
    await rejectFollowUpRequestForRegisteredPatient(followUpRequestId);
    res.status(StatusCodes.OK).send();
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const acceptFollowUpRequestForRegisteredHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { followUpRequestId } = req.params;
  if (!followUpRequestId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "Missing required fields" });
  }
  try {
    await acceptFollowUpRequestForRegisteredPatient(followUpRequestId);
    res.status(StatusCodes.OK).send();
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};
