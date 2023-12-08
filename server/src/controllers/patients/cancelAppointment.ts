import { Request, Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { cancelAppointment } from "../../services/patients/index";

export const cancelAppointmentController = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { appointmentId } = req.params;
  const patientId = req.user?.id!;
  try {
    await cancelAppointment(appointmentId, patientId);
    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel appointment" });
  }
};


