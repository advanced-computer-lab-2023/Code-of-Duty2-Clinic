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
import {
  addPatientHealthRecord,
  deletePatientHealthRecord,
  getPatientHealthRecords,
} from "../../controllers/patients/healthRecords";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
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

  .get("prescriptions", getAllPrescriptions)

  .get("/health-records", getPatientHealthRecords)

  .put("/health-records", addPatientHealthRecord)

  .delete("/health-records", deletePatientHealthRecord)

  .get("/family-members", getPatientRegisteredFamilyMembers)

  .get("/appointments", getAppointmentsWithAllDoctors)

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
