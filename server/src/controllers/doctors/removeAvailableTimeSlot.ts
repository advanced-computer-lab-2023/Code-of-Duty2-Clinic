import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import Doctor from "../../models/doctors/Doctor";

export const deleteDoctorAvailableSlots = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const doctorId = req.user?.id!;
    const startTime = req.params.startTime;

    if (!doctorId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const doctor = await Doctor.findById(doctorId).select("+availableSlots");

    if (!doctor) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Doctor not found" });
    }

    const existingAvailableSlot = doctor.availableSlots.map(
      (slot) => String(slot.startTime) === startTime
    );

    if (!existingAvailableSlot) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "This time slot is not found" });
    }

    await Doctor.updateOne(
      { _id: doctorId },
      { $pull: { availableSlots: { startTime } } }
    );
    return res
      .status(StatusCodes.OK)
      .json({ message: "Time slot deleted successfully" });
  } catch (error) {
    console.error(error);

    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "An error occurred while deleting the time slot" });
  }
};
