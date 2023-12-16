import { Router } from "express";
import { getAllDoctors } from "../../controllers/patients/getAllDoctors";
import { getDoctorById } from "../../controllers/patients/getDoctorById";
import { getPatientDoctorsHandler } from "../../controllers/patients/getPatientDoctors";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import UserRole from "../../types/UserRole";
import { getDoctorSchedule } from "../../controllers/doctors/getSchedule";

const router = Router();

router.use(authenticateUser);
router.use(authorizeUser(UserRole.PATIENT));

router
  .get("/doctors", getAllDoctors)

  .get("/doctors/:doctorId", getDoctorById)

  .get("/patient-doctors", getPatientDoctorsHandler)

  .get("/doctors/:doctorId/schedule", getDoctorSchedule);

export default router;
