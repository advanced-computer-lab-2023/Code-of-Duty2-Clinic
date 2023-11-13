import express from "express";
import { updateDoctor } from "../../controllers/doctors/updateDoctor";
import { getDoctor } from "../../controllers/doctors/getDoctor";
import { getAppointmentsWithAllPatients } from "../../controllers/doctors/getAllAppointments";
import { getRegisteredPatients } from "../../controllers/doctors/getRegisteredPatients";
import { getAppointmentDetails } from "../../controllers/doctors/getAppointmentDetails";
import { getDoctorById } from "../../controllers/patients/getDoctorById";
import getRegisteredPatientDetails from "../../controllers/doctors/getRegisteredPatientDetails";
import UserRole from "../../types/UserRole";
import { authorizeUser } from "../../middlewares/authorization";
import { authenticateUser } from "../../middlewares/authentication";
import { doctorAddPatientHealthRecord } from "../../controllers/doctors/addPatientHealthRecord";
import { getAllPatients } from "../../controllers/doctors/getAllPatients";

import {
  addDoctorAWalletHandler,
  authenticateWalletDoctorHandler,
  doesADoctorHaveAWalletHandler,
  getDoctorWalletHandler,
  performAWalletTransactionHandler,
  rechargeDoctorWalletHandler,
} from "../../controllers/payments/wallets/Doctor";
import { authenticateWalletUser } from "../../middlewares/walletAuthentication";
import {
  configureCreditCardPaymentHandler,
  makeCreditCardPaymentHandler,
} from "../../controllers/payments/credit-cards/Patient";


const doctorRouter = express.Router();

doctorRouter.use(authenticateUser);
doctorRouter.use(authorizeUser(UserRole.DOCTOR));

doctorRouter

  .get("/account", getDoctor)

  .patch("/account", updateDoctor)

  .get("/patients", getAllPatients)

  .get("/patients", getRegisteredPatients)

  .get("/patients/:patientId", getRegisteredPatientDetails)

  .put("/patients/:patientId/health-records", doctorAddPatientHealthRecord)

  .get("/appointments", getAppointmentsWithAllPatients)

  .get("/appointments/:appointmentId", getAppointmentDetails)

  .get("", getDoctorById)

  .get("/wallets/exists", doesADoctorHaveAWalletHandler)

  .post("/validate-wallet-pin-code", authenticateWalletDoctorHandler)

  .post("/wallets", addDoctorAWalletHandler)

  .get("/wallets", authenticateWalletUser, getDoctorWalletHandler)

  .patch(
    "/wallet-transactions",
    authenticateWalletUser,
    performAWalletTransactionHandler
  )

  .patch(
    "/wallet-recharge",
    authenticateWalletUser,
    rechargeDoctorWalletHandler
  )

  .get("/credit-card-configuration", configureCreditCardPaymentHandler)

  .post("/credit-card-payment", makeCreditCardPaymentHandler);

export default doctorRouter;
