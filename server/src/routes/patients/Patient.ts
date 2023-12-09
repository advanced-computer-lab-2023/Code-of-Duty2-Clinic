import express from "express";
import { addFamilyMembers } from "../../controllers/patients/addFamilyMembers";
import { getDoctorById } from "../../controllers/patients/getDoctorById";
import { getAllDoctors } from "../../controllers/patients/getAllDoctors";
import { getPatientById } from "../../controllers/patients/getPatientById";
import { getPatientRegisteredFamilyMembers } from "../../controllers/patients/getPatientRegisteredFamilyMembers";
import { getPatientInfo } from "../../controllers/patients/getPatientInfo";
import { getAppointmentsWithAllDoctors } from "../../controllers/appointments";
import { getAllPrescriptions } from "../../controllers/prescriptions/getPrescriptions";
import { getPatientPrescriptions } from "../../controllers/prescriptions/getPatientPrescriptions";
import { updatePatientPassword } from "../../controllers/patients/patientUpdatePassword";
import { addPatientRegisteredFamilyMember } from "../../controllers/patients/patientRegisteredFamilyMemberController";
import { deletePatientRegisteredFamilyMember } from "../../controllers/patients/patientRegisteredFamilyMemberController";
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
import { viewHealthPackagesOptions } from "../../controllers/healthPackages/viewHealthPackagesOptions";
import { subscribeToHealthPackage } from "../../controllers/healthPackages/subscribePackageOfPatient";
import { setSubscribedPackageForDependent } from "../../controllers/healthPackages/subscribeToPackageForDependent";
import { viewSubscribedHealthPackage } from "../../controllers/healthPackages/viewSubscribedHealthPackage";
import { viewSubscribedPackageDetailsForDependent } from "../../controllers/healthPackages/viewPackageDetailsForDependent";
import { viewHealthCarePackageStatus } from "../../controllers/healthPackages/viewPackageDetails";
import { viewSubscribedPackage } from "../../controllers/healthPackages/viewHealthPackageIndependent";
import { cancelSubscription } from "../../controllers/healthPackages/cancelSubscription";
import { cancelSubscribedForDependent } from "../../controllers/healthPackages/cancelSubForIndependent";
import { viewSubscribedHealthPackageBenefits } from "../../controllers/healthPackages/viewBenefitsOfPackage";
import { getDependentFamilyMembers } from "../../controllers/patients/viewDependentFamilyMembers";
import { cancelSubscriptionForRegistered } from "../../controllers/healthPackages/cancelSubscriptionForRegistered";
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
} from "../../controllers/payments/credit-cards";
import { viewSubscribedHealthPackageAllDetailsD } from "../../controllers/healthPackages/viewSubscribedHealthPackageAllDetailsD";
import { viewSubscribedHealthPackageAllDetailsR } from "../../controllers/healthPackages/viewSubscribedHealthPackageAllDetailsR";
import { cancelSubscriptionR } from "../../controllers/healthPackages/cancelSubscriptionForR";
import { subscribeToHealthPackageR } from "../../controllers/healthPackages/subscribeForR";
import { getHealthPackage } from "../../controllers/healthPackages/getHealthPackage";
import {
  bookAnAppointmentForADependentFamilyMemberHandler as bookAppointmentForADependentFamilyMemberHandler,
  bookAnAppointmentForARegisteredFamilyMemberHandler as bookAppointmentForARegisteredFamilyMemberHandler,
  bookAnAppointmentHandler as bookAppointmentHandler,
  getDoctorAppointmentFeesHandler,
} from "../../controllers/appointments/patients";
import { getPatientDoctorsHandler } from "../../controllers/patients/getPatientDoctors";

const patientRouter = express.Router();

patientRouter.use(authenticateUser);
patientRouter.use(authorizeUser(UserRole.PATIENT));

patientRouter
  .get("/doctors", getAllDoctors)

  .get("/doctors/:doctorId", getDoctorById)

  .get("/patient-info", getPatientInfo)

  .get("/patient-doctors", getPatientDoctorsHandler)

  .post("/family-members", addFamilyMembers)

  // .get("/me", getPatientDetails)

  .get("/prescriptions", getPatientPrescriptions)

  .get("/appointments", getAppointmentsWithAllDoctors)

  .get("/family-members/requests", getPatientRegisteredFamilyMemberRequests)

  .get("/family-members/:familyMemberId", getPatientRegisteredFamilyMemberById)

  .patch("/change-password", updatePatientPassword)

  .get("/health-records", getPatientHealthRecords)
  .post("/family-members/registered", addPatientRegisteredFamilyMember)

  .delete("/family-members/registered", deletePatientRegisteredFamilyMember)

  .post(
    "/family-members/requests/:familyMemberId/reject",
    rejectPatientRegisteredFamilyMember
  )

  .get("/appointments", getAppointmentsWithAllDoctors)

  .get("prescriptions", getAllPrescriptions)

  .get("/appointments/:doctorId", getDoctorAppointmentFeesHandler)

  .post("/appointments/:doctorId", bookAppointmentHandler)
  .post(
    "/registered-family-members/:familyMemberId/appointments/:doctorId",
    bookAppointmentForARegisteredFamilyMemberHandler
  )
  .post(
    "/dependent-family-members/:dependentNationalId/appointments/:doctorId",
    bookAppointmentForADependentFamilyMemberHandler
  )

  .get("/health-records", getPatientHealthRecords)

  .put("/health-records", addPatientHealthRecord)

  .delete("/health-records", deletePatientHealthRecord)

  .get("/family-members", getPatientRegisteredFamilyMembers)

  .get("/appointments", getAppointmentsWithAllDoctors)

  .get("/health-packages", viewHealthPackagesOptions)

  .post("/subscribe/:packageId", subscribeToHealthPackage)

  .post(
    "/registered-members/:patientId/subscribe/:packageId",
    subscribeToHealthPackageR
  )

  .post(
    "/dependent-members/:dependentNid/subscribe/:packageId",
    setSubscribedPackageForDependent
  )

  .get("/patient-health-package", viewSubscribedHealthPackage)

  .get("/package-dependent", viewSubscribedPackageDetailsForDependent)

  .get("/health-care-package-status", viewHealthCarePackageStatus)

  .get(
    "/dependent-family-members/:patientNId/health-package",
    viewSubscribedHealthPackageAllDetailsD
  )

  .get(
    "/registered-family-members/:patientId/health-package",
    viewSubscribedHealthPackageAllDetailsR
  )

  .patch("/cancel-subscription", cancelSubscription)

  .patch("/cancel-subscription/:patientId", cancelSubscriptionR)

  .patch(
    "/cancel-subscription-dependent/:dependentNid",
    cancelSubscribedForDependent
  )

  .get("/package-benefits", viewSubscribedHealthPackageBenefits)

  .get("/dependent-family-members", getDependentFamilyMembers)

  .patch(
    "/registered-family/cancel-subscription",
    cancelSubscriptionForRegistered
  )

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

  .post("/payments/create-payment-intent", makeCreditCardPaymentHandler)

  .get("/:patientId", getPatientById)

  .get("/health-packages/:packageId", getHealthPackage)

export default patientRouter;
