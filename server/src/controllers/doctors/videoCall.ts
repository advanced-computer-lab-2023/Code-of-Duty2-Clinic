import { Response } from "express";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import Appointment, { IAppointmentModel } from "../../models/appointments/Appointment";
import DependentFamilyMemberAppointment from "../../models/appointments/DependentFamilyMemberAppointment";
import { IDependentFamilyMemberAppointment } from "../../models/appointments/interfaces/IDependentFamilyMemberAppointment";
import { findPatientById } from "../../services/patients";
import { IAppointment } from "./interfaces/Appointment";

export const getSoonestAppointmentHandler = async (req: AuthorizedRequest, res: Response) => {
  const doctorId = req.user!.id;
  try {
    const soonestEver = await getSoonestAppointment(doctorId);
    res.status(200).json(soonestEver);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getSoonestAppointment = async (doctorId: string) => {
  const soonestAppointment = await Appointment.findOne({
    doctorId
  }).sort({ "timePeriod.startTime": 1 });

  const soonestDependentAppointment = await DependentFamilyMemberAppointment.findOne({
    doctorId,
    "timePeriod.startTime": { $lte: new Date() },
    status: { $in: ["upcoming", "rescheduled"] }
  }).sort({ "timePeriod.startTime": -1 });

  const soonestEver =
    soonestAppointment?.timePeriod.startTime.getTime()! <
    soonestDependentAppointment?.timePeriod.startTime.getTime()!
      ? soonestAppointment
      : soonestDependentAppointment;
  return soonestEver;
};
export const storeVideoLinkInPatient = async (req: AuthorizedRequest, res: Response) => {
  const { url } = req.body;
  const doctorId = req.user!.id;
  try {
    const soonestEver = await getSoonestAppointment(doctorId);
    if (!soonestEver) {
      return res.status(400).json({ error: "No upcoming appointments" });
    }
    if ((soonestEver as IDependentFamilyMemberAppointment).dependentNationalId) {
      const patient = await findPatientById(
        soonestEver.payerId.toString(),
        "currentVideoMeetingLink"
      );
      patient!.currentVideoMeetingLink = url;
      await patient!.save();
    } else {
      const patient = await findPatientById(
        (soonestEver as IAppointmentModel).patientId.toString(),
        "currentVideoMeetingLink"
      );
      patient!.currentVideoMeetingLink = url;
      await patient!.save();
    }
    res.status(200).json({ message: "Video link stored successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPatientVideoLink = async (req: AuthorizedRequest, res: Response) => {
  const patientId = req.user!.id;
  try {
    const patient = await findPatientById(patientId, "currentVideoMeetingLink");
    if (!patient) {
      return res.status(400).json({ error: "No upcoming appointments" });
    }
    if (!patient.currentVideoMeetingLink) {
      return res.status(400).json({ error: "No video link found" });
    }
    res.status(200).json({ url: patient.currentVideoMeetingLink });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
