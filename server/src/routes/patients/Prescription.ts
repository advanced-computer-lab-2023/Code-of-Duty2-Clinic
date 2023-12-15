import { Router } from "express";
import { getPatientPrescriptions } from "../../controllers/prescriptions/getPatientPrescriptions";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import UserRole from "../../types/UserRole";

const router = Router();

router.use(authenticateUser);
router.use(authorizeUser(UserRole.PATIENT));

router.get("/prescriptions", getPatientPrescriptions);

export default router;
