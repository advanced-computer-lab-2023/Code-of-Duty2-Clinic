import express from "express";
import { getPatientById } from "../../controllers/patients/getPatientById";
import { getPatientRegisteredFamilyMembers } from "../../controllers/patients/getPatientRegisteredFamilyMembers";
import { getPatientDependentFamilyMembers } from "../../controllers/patients/getPatientDependentFamilyMembers";
import { getPatientInfo } from "../../controllers/patients/getPatientInfo";
import { updatePatientPassword } from "../../controllers/patients/patientUpdatePassword";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import { viewHealthPackagesOptions } from "../../controllers/healthPackages/viewHealthPackagesOptions";
import { subscribeToHealthPackage } from "../../controllers/healthPackages/subscribePackageOfPatient";
import { setSubscribedPackageForDependent } from "../../controllers/healthPackages/subscribeToPackageForDependent";
import { viewSubscribedHealthPackage } from "../../controllers/healthPackages/viewSubscribedHealthPackage";
import { viewSubscribedPackageDetailsForDependent } from "../../controllers/healthPackages/viewPackageDetailsForDependent";
import { viewHealthCarePackageStatus } from "../../controllers/healthPackages/viewPackageDetails";
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
  rechargePatientWalletHandler
} from "../../controllers/payments/wallets/Patient";
import { performAWalletTransactionHandler } from "../../controllers/payments/wallets/Patient";
import { authenticateWalletUser } from "../../middlewares/walletAuthentication";
import {
  configureCreditCardPaymentHandler,
  makeCreditCardPaymentHandler
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
  getAppointmentsWithAllDoctors,
  getDoctorAppointmentFeesHandler,
} from "../../controllers/appointments/patients";
import { getPatientDoctorsHandler } from "../../controllers/patients/getPatientDoctors";
import { getPatientDependentFamilyMemberById } from "../../controllers/patients/getPatientDependentFamilyMemberById";
import { addPatientHealthRecord, deletePatientHealthRecord, getPatientHealthRecords } from "../../controllers/patients/healthRecords";
import { addPatientRegisteredFamilyMember, deletePatientRegisteredFamilyMember, rejectPatientRegisteredFamilyMember } from "../../controllers/patients/patientRegisteredFamilyMemberController";
import { getPatientRegisteredFamilyMemberById } from "../../controllers/patients/getPatientRegisteredFamilyMemberById";
import { getPatientRegisteredFamilyMemberRequests } from "../../controllers/patients/getPatientRegisteredFamilyMemberRequests";
import { getAllPrescriptions } from "../../controllers/prescriptions/getAllPatientPrescriptions";
import { getPatientPrescriptions } from "../../controllers/prescriptions/getPatientPrescriptions";
import { addFamilyMembers } from "../../controllers/patients/addFamilyMembers";
import { getPatientDependentFamilyMemberPrescriptions } from "../../controllers/prescriptions/getPatientDependentFamilyMemberPrescriptions";
import { getAllNotificationsForPatientHandler } from "../../controllers/patients/notifications";

const patientRouter = express.Router();

patientRouter.use(authenticateUser);
patientRouter.use(authorizeUser(UserRole.PATIENT));

patientRouter

  .get("/patient-info", getPatientInfo)

  .get("/patient-doctors", getPatientDoctorsHandler)

  .post("/family-members", addFamilyMembers)

  // .get("/me", getPatientDetails)

  .get("/prescriptions", getPatientPrescriptions)

  .get("/prescriptions/view", getAllPrescriptions)

  // .get("/prescriptions", getAllPrescriptions)

  .get("/appointments", getAppointmentsWithAllDoctors)

  .get("/family-members/requests", getPatientRegisteredFamilyMemberRequests)

  .get("/family-members/registered", getPatientRegisteredFamilyMembers)

  .get("/family-members/dependent", getPatientDependentFamilyMembers)

  .get("/family-members/registered/member", getPatientRegisteredFamilyMemberById)

  .get("/family-members/dependent/member", getPatientDependentFamilyMemberById)

  .get("family-members/dependent/prescriptions", getPatientDependentFamilyMemberPrescriptions)


  .patch("/change-password", updatePatientPassword)

  .get("/health-records", getPatientHealthRecords)
  .post("/family-members/registered", addPatientRegisteredFamilyMember)

  .delete("/family-members/registered", deletePatientRegisteredFamilyMember)

  .post(
    "/family-members/requests/:familyMemberId/reject",
    rejectPatientRegisteredFamilyMember
  )

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

  .patch("/change-password", updatePatientPassword)

  .get("/wallets/exists", doesAPatientHaveAWalletHandler)

  .post("/validate-wallet-pin-code", authenticateWalletPatientHandler)

  .post("/wallets", addPatientAWalletHandler)

  .get("/wallets", authenticateWalletUser, getPatientWalletHandler)

  .patch("/wallet-transactions", authenticateWalletUser, performAWalletTransactionHandler)

  .patch("/wallet-recharge", authenticateWalletUser, rechargePatientWalletHandler)

  .get("/payments/configuration", configureCreditCardPaymentHandler)

  .post("/payments/create-payment-intent", makeCreditCardPaymentHandler)

  .get("/notifications", getAllNotificationsForPatientHandler)

  .get("/:patientId", getPatientById);

export default patientRouter;
