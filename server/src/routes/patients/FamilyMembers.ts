import { Router } from "express";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import UserRole from "../../types/UserRole";
import { addFamilyMembers } from "../../controllers/patients/addFamilyMembers";
import { getPatientRegisteredFamilyMemberById } from "../../controllers/patients/getPatientRegisteredFamilyMemberById";
import { getPatientRegisteredFamilyMemberRequests } from "../../controllers/patients/getPatientRegisteredFamilyMemberRequests";
import {
  addPatientRegisteredFamilyMember,
  deletePatientRegisteredFamilyMember,
  rejectPatientRegisteredFamilyMember,
} from "../../controllers/patients/patientRegisteredFamilyMemberController";
import { getPatientRegisteredFamilyMembers } from "../../controllers/patients/getPatientRegisteredFamilyMembers";
import { getDependentFamilyMembers } from "../../controllers/patients/viewDependentFamilyMembers";

const router = Router();

router.use(authenticateUser);
router.use(authorizeUser(UserRole.PATIENT));

router
  .post("/family-members", addFamilyMembers)

  .get("/family-members/requests", getPatientRegisteredFamilyMemberRequests)

  .get("/family-members/:familyMemberId", getPatientRegisteredFamilyMemberById)

  .post("/family-members/registered", addPatientRegisteredFamilyMember)

  .delete("/family-members/registered", deletePatientRegisteredFamilyMember)

  .post(
    "/family-members/requests/:familyMemberId/reject",
    rejectPatientRegisteredFamilyMember
  )

  .get("/family-members", getPatientRegisteredFamilyMembers)

  .get("/dependent-family-members", getDependentFamilyMembers);

export default router;
