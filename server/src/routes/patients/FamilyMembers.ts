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
import { getPatientDependentFamilyMembers } from "../../controllers/patients/getPatientDependentFamilyMembers";
import { getPatientDependentFamilyMemberById } from "../../controllers/patients/getPatientDependentFamilyMemberById";
import { getPatientDependentFamilyMemberPrescriptions } from "../../controllers/prescriptions/getPatientDependentFamilyMemberPrescriptions";

const router = Router();

router.use(authenticateUser);
router.use(authorizeUser(UserRole.PATIENT));

router
  .post("/family-members", addFamilyMembers)

  .get("/family-members/requests", getPatientRegisteredFamilyMemberRequests)

  .post("/family-members/registered", addPatientRegisteredFamilyMember)

  .delete("/family-members/registered", deletePatientRegisteredFamilyMember)

  .post(
    "/family-members/requests/:familyMemberId/reject",
    rejectPatientRegisteredFamilyMember
  )

  .get("/family-members", getPatientRegisteredFamilyMembers)

  // .get("/dependent-family-members", getDependentFamilyMembers);

  
  .get("/family-members/requests", getPatientRegisteredFamilyMemberRequests)

  .get("/family-members/registered", getPatientRegisteredFamilyMembers)

  .get("/family-members/dependent", getPatientDependentFamilyMembers)

  .get("/family-members/registered/member", getPatientRegisteredFamilyMemberById)

  .get("/family-members/dependent/member", getPatientDependentFamilyMemberById)

  .get("family-members/dependent/prescriptions", getPatientDependentFamilyMemberPrescriptions)

  .get("/family-members/:familyMemberId", getPatientRegisteredFamilyMemberById)

export default router;
