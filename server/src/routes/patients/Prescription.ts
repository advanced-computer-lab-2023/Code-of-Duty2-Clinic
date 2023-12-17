import { Router } from "express";
import { getPatientPrescriptions } from "../../controllers/prescriptions/getPatientPrescriptions";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import UserRole from "../../types/UserRole";
import { getPatientPrescription } from "../../controllers/prescriptions/getPatientPrescription";
import { get } from "http";
import { createOrderFromPrescription } from "../../controllers/orders/createOrder";
import { getPatientById } from "../../controllers/patients/getPatientById";

const router = Router();

router.use(authenticateUser);
router.use(authorizeUser(UserRole.PATIENT));

router
  .get("/prescriptions", getPatientPrescriptions)

  .get("/prescription/:prescriptionId", getPatientPrescription)

  .post("/prescription/:prescriptionId/pay", createOrderFromPrescription)
  .get("/:patientId", getPatientById);

export default router;
