import { Response } from "express";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";
import { bookAnAppointmentForADependentFamilyMember } from "../../../services/appointments/patients/dependent-family-members";
import { StatusCodes } from "http-status-codes";
import PaymentMethod from "../../../types/PaymentMethod";
import {
  bookAnAppointment,
  getAppointmentFeesWithADoctor,
} from "../../../services/appointments/patients";

export const bookAnAppointmentHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  const doctorId = req.params.doctorId;
  if (!doctorId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "doctorId is required" });

  const { startTime, endTime } = req.body;
  if (!startTime || !endTime)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "startTime and endTime are required" });

  const paymentMethod =
    req.query.paymentMethod === "wallet"
      ? PaymentMethod.WALLET
      : PaymentMethod.CREDIT_CARD;
  try {
    await bookAnAppointment(
      patientId,
      patientId,
      doctorId,
      startTime,
      endTime,
      paymentMethod
    );
    res.status(StatusCodes.CREATED).send({ message: "Appointment booked" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const bookAnAppointmentForARegisteredFamilyMemberHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  const { familyMemberId, doctorId } = req.params;
  if (!familyMemberId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "familyMemberId is required" });
  if (!doctorId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "doctorId is required" });

  const { startTime, endTime } = req.body;
  if (!startTime || !endTime)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "startTime and endTime are required" });

  const paymentMethod =
    req.query.paymentMethod === "wallet"
      ? PaymentMethod.WALLET
      : PaymentMethod.CREDIT_CARD;

  try {
    await bookAnAppointment(
      patientId,
      familyMemberId as string,
      doctorId,
      startTime,
      endTime,
      paymentMethod
    );
    res.status(StatusCodes.CREATED).send({ message: "Appointment booked" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const bookAnAppointmentForADependentFamilyMemberHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  const { dependentNationalId, doctorId } = req.params;
  if (!dependentNationalId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "dependentNationalId is required" });
  if (!doctorId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "doctorId is required" });

  const { startTime, endTime } = req.body;
  if (!startTime || !endTime)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "startTime and endTime are required" });

  const paymentMethod =
    req.query.paymentMethod === "wallet"
      ? PaymentMethod.WALLET
      : PaymentMethod.CREDIT_CARD;
  try {
    await bookAnAppointmentForADependentFamilyMember(
      patientId,
      dependentNationalId as string,
      doctorId,
      startTime,
      endTime,
      paymentMethod
    );
    res.status(StatusCodes.CREATED).send({ message: "Appointment booked" });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};

export const getDoctorAppointmentFeesHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const patientId = req.user?.id!;
  const doctorId = req.params.doctorId;
  if (!doctorId)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: "doctorId is required" });

  try {
    const fees = await getAppointmentFeesWithADoctor(patientId, doctorId);
    res.status(StatusCodes.OK).send({ fees });
  } catch (error: any) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: error.message });
  }
};
