import { Request, Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { cancelAppointmentD } from "../../services/doctors/index";

export const cancelAppointmentController = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { appointmentId } = req.params;
  const  doctorId  = req.user?.id!;
  try {
    await cancelAppointmentD(appointmentId, doctorId);
    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel appointment" });
  }
};
