import express from "express";
import { addFamilyMembers } from "../../controllers/patients/addFamilyMembers";
import { getDoctorById } from "../../controllers/patients/getDoctorById";
import { getAllDoctors } from "../../controllers/patients/getAllDoctors";
import { getPatientById } from "../../controllers/patients/getPatientById";
import { getPatientRegisteredFamilyMembers } from "../../controllers/patients/getPatientRegisteredFamilyMembers";
import { getPatientInfo } from "../../controllers/patients/getPatientInfo";
import { getAppointmentsWithAllDoctors } from "../../controllers/patients/getAllAppointments";
import { getAllPrescriptions } from "../../controllers/prescriptions/getPrescriptions";
import { getPatientPrescriptions } from "../../controllers/prescriptions/getPatientPrescriptions";
import { addPatientRegisteredFamilyMember } from "../../controllers/patients/addPatientRegisteredFamilyMember";
import { deletePatientRegisteredFamilyMember } from "../../controllers/patients/deletePatientRegisteredFamilyMember";
import { getPatientRegisteredFamilyMemberById } from "../../controllers/patients/getPatientRegisteredFamilyMemberById";
import { rejectPatientRegisteredFamilyMember } from "../../controllers/patients/patientRegisteredFamilyMemberController";
import { getPatientRegisteredFamilyMemberRequests } from "../../controllers/patients/getPatientRegisteredFamilyMemberRequests";
import {
  addPatientHealthRecord,
  deletePatientHealthRecord,
  getPatientHealthRecords,
} from "../../controllers/patients/healthRecords";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import { viewHealthPackagesOptions } from "../../controllers/patients/viewHealthPackagesOptions";
import { subscribeToHealthPackage } from "../../controllers/patients/subscribePackageOfPatient";
import { setSubscribedPackageForDependent } from "../../controllers/patients/subscribeToPackageForIndependent";
import { viewSubscribedHealthPackage } from "../../controllers/patients/viewSubscribedHealthPackage";
import { viewSubscribedPackageDetailsForDependent } from "../../controllers/patients/viewPackageDetailsForDependent";
import { viewHealthCarePackageStatus } from "../../controllers/patients/viewPackageDetails";
import { viewSubscribedPackage } from "../../controllers/patients/viewHealthPackageIndependent";
import { cancelSubscription } from "../../controllers/patients/cancelSubscription";
import { cancelSubscribedForDependent } from "../../controllers/patients/cancelSubForIndependent";
import { viewSubscribedHealthPackageBenefits } from "../../controllers/patients/viewBenefitsOfPackage";
import { viewDependentFamilyMembersService } from "../../services/patients";
import { getDependentFamilyMembers } from "../../controllers/patients/viewDependentFamilyMembers";
import  {cancelSubscriptionForRegistered}  from "../../controllers/patients/cancelSubscriptionForRegistered";
import UserRole from "../../types/UserRole";
import {
  addPatientAWalletHandler,
  authenticateWalletPatientHandler,
  doesAPatientHaveAWalletHandler,
  getPatientWalletHandler,
  rechargePatientWalletHandler,
} from "../../controllers/payments/wallets/Patient";
import { performAWalletTransactionHandler } from "../../controllers/payments/wallets/Patient";
import { authenticateWalletUser } from "../../middlewares/walletAuthentication";
import {
  configureCreditCardPaymentHandler,
  makeCreditCardPaymentHandler,
} from "../../controllers/payments/credit-cards/Patient";
const patientRouter = express.Router();

patientRouter.use(authenticateUser);
patientRouter.use(authorizeUser(UserRole.PATIENT));

patientRouter
  .get("/doctors", getAllDoctors)

  .get("/doctors/:doctorId", getDoctorById)

  .get("/patient-info", getPatientInfo)

  .post("/family-members", addFamilyMembers)

  .get("", getPatientById)

  .get("/prescriptions", getPatientPrescriptions)

  .get("/appointments", getAppointmentsWithAllDoctors)

  .get('/family-members/requests', getPatientRegisteredFamilyMemberRequests)

  .get('/family-members/:familyMemberId', getPatientRegisteredFamilyMemberById)

  .post('/family-members/registered', addPatientRegisteredFamilyMember)

  .delete('/family-members/registered', deletePatientRegisteredFamilyMember)

  .post('/family-members/requests/:familyMemberId/reject', rejectPatientRegisteredFamilyMember)

  .get('/appointments', getAppointmentsWithAllDoctors)
  
  .get("prescriptions", getAllPrescriptions)

  .get("/health-records", getPatientHealthRecords)

  .put("/health-records", addPatientHealthRecord)

  .delete("/health-records", deletePatientHealthRecord)

  .get("/family-members", getPatientRegisteredFamilyMembers)

  .get("/appointments", getAppointmentsWithAllDoctors)

  .get("/health-packages", viewHealthPackagesOptions)

  .post("/subscribe", subscribeToHealthPackage)

  .post("/subscribe/dependent-member", setSubscribedPackageForDependent)

  .get("/patient-health-package", viewSubscribedHealthPackage)

  .get("/package-dependent", viewSubscribedPackageDetailsForDependent)

  .get("/health-care-package-status", viewHealthCarePackageStatus)

  .get("/dependent-health-package", viewSubscribedPackage)

  .patch("/cancel-subscription", cancelSubscription)

  .patch("/cancel-subscription-dependent", cancelSubscribedForDependent)

  .get("/package-benefits", viewSubscribedHealthPackageBenefits)

  .get("/dependent-family-members", getDependentFamilyMembers)

  .patch("/registered-family/cancel-subscription", cancelSubscriptionForRegistered)
  .get("/wallets/exists", doesAPatientHaveAWalletHandler)

  .post("/validate-wallet-pin-code", authenticateWalletPatientHandler)

  .post("/wallets", addPatientAWalletHandler)

  .get("/wallets", authenticateWalletUser, getPatientWalletHandler)

  .patch(
    "/wallet-transactions",
    authenticateWalletUser,
    performAWalletTransactionHandler
  )

  .patch(
    "/wallet-recharge",
    authenticateWalletUser,
    rechargePatientWalletHandler
  )

  .get("/payments/configuration", configureCreditCardPaymentHandler)

  .post("/payments/create-payment-intent", makeCreditCardPaymentHandler);

export default patientRouter;
