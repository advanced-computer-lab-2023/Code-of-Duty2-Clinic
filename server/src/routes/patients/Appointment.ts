import { Router } from "express";
import { getAppointmentsWithAllDoctors } from "../../controllers/appointments/patients";
import { getDoctorAppointmentFeesHandler } from "../../controllers/appointments/patients";
import {
  bookAnAppointmentForADependentFamilyMemberHandler as bookAppointmentForADependentFamilyMemberHandler,
  bookAnAppointmentForARegisteredFamilyMemberHandler as bookAppointmentForARegisteredFamilyMemberHandler,
  bookAnAppointmentHandler as bookAppointmentHandler,
} from "../../controllers/appointments/patients";

const router = Router();

router
  .get("/appointments", getAppointmentsWithAllDoctors)

  .get("/appointments/:doctorId", getDoctorAppointmentFeesHandler)

  .post("/appointments/:doctorId", bookAppointmentHandler)
  .post(
    "/registered-family-members/:familyMemberId/appointments/:doctorId",
    bookAppointmentForARegisteredFamilyMemberHandler
  )
  .post(
    "/dependent-family-members/:dependentNationalId/appointments/:doctorId",
    bookAppointmentForADependentFamilyMemberHandler
  );

export default router;
