import { Router } from "express";
import { getAppointmentsWithAllDoctors } from "../../controllers/appointments/patients";
import { getDoctorAppointmentFeesHandler } from "../../controllers/appointments/patients";
import {
  bookAnAppointmentForADependentFamilyMemberHandler as bookAppointmentForADependentFamilyMemberHandler,
  bookAnAppointmentForARegisteredFamilyMemberHandler as bookAppointmentForARegisteredFamilyMemberHandler,
  bookAnAppointmentHandler as bookAppointmentHandler
} from "../../controllers/appointments/patients";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import UserRole from "../../types/UserRole";

const router = Router();

router.use(authenticateUser);
router.use(authorizeUser(UserRole.PATIENT));

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
