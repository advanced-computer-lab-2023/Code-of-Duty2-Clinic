import express from "express";
import { updateDoctor } from "../../controllers/doctors/updateDoctor";
import { getDoctor } from "../../controllers/doctors/getDoctor";
import { getAppointmentsWithAllPatients } from "../../controllers/appointments/doctors/getAllAppointments";
import { getDoctorPatientsHandler } from "../../controllers/doctors/getDoctorPatients";
import { getAppointmentDetails } from "../../controllers/appointments/doctors/getAppointmentDetails";
import { getDoctorById } from "../../controllers/patients/getDoctorById";
import getRegisteredPatientDetails from "../../controllers/doctors/getRegisteredPatientDetails";
import { addDoctorSchedule } from "../../controllers/doctors/addSchedule";
import { updateDoctorPassword } from "../../controllers/doctors/doctorUpdatePassword";
import { scheduleFollowUpAppointmentHandler } from "../../controllers/appointments/doctors";
import { getDoctorSchedule } from "../../controllers/doctors/getSchedule";
import { deleteDoctorWorkingSlot } from "../../controllers/doctors/removeDoctorWorkingSlot";
import UserRole from "../../types/UserRole";
import { authorizeUser } from "../../middlewares/authorization";
import { authenticateUser } from "../../middlewares/authentication";
import { doctorAddPatientHealthRecord } from "../../controllers/doctors/addPatientHealthRecord";
import {
  addDoctorAWalletHandler,
  authenticateWalletDoctorHandler,
  doesADoctorHaveAWalletHandler,
  getDoctorWalletHandler,
  performAWalletTransactionHandler,
  rechargeDoctorWalletHandler
} from "../../controllers/payments/wallets/Doctor";
import { authenticateWalletUser } from "../../middlewares/walletAuthentication";
import {
  configureCreditCardPaymentHandler,
  makeCreditCardPaymentHandler
} from "../../controllers/payments/credit-cards";
import { createPatientPrescriptionHandler } from "../../controllers/doctors/createPatientPrescription";
import { updateMedicineAndDosageHandler } from "../../controllers/doctors/updateDosageInPatentPrescription";
import { addMedicineToPatientPrescriptionHandler } from "../../controllers/doctors/addMedicineToPatientPrescription";
import { getPatientPrescriptionsHandler } from "../../controllers/doctors/getPatientPrescriptionsHandler";
import { submitPrescriptionHandler } from "../../controllers/doctors/submitPrescription";

import { getAllNotificationsForDoctorHandler } from "../../controllers/doctors/notifications";
import { getPatientHealthRecordsByDoctor } from "../../controllers/doctors/getPatientHealthRecord";
import { getDoctorPatientGeneralInfo } from "../../controllers/doctors/getDoctorAndPatientGeneralInfo";
import { scheduleFollowUpAppointmentForDependentHandler } from "../../controllers/appointments/follow-ups/for-dependent-patients";

const doctorRouter = express.Router();

doctorRouter.use(authenticateUser);
doctorRouter.use(authorizeUser(UserRole.DOCTOR));

doctorRouter
  .get("/account", getDoctor)

  .patch("/account", updateDoctor)

  .get("/patients", getDoctorPatientsHandler)

  // .get("/prescriptions", getDoctorPrescriptions)

  .get("/patients/:patientId", getRegisteredPatientDetails)

  .get("", getDoctorById)

  .get("/schedule", getDoctorSchedule)
  .post("/schedule", addDoctorSchedule)

  .patch("/change-password", updateDoctorPassword)

  .post("/appointments/:patientId/follow-up", scheduleFollowUpAppointmentHandler)
  .post("/appointments/dependent-follow-up", scheduleFollowUpAppointmentForDependentHandler)

  .post("/appointments/:patientId/follow-up", scheduleFollowUpAppointmentHandler)

  .delete("/available-time-slots/:startTime", deleteDoctorWorkingSlot)

  .put("/patients/:patientId/health-records", doctorAddPatientHealthRecord)

  .get("/appointments", getAppointmentsWithAllPatients)

  .get("/appointments/:appointmentId", getAppointmentDetails)

  .get("", getDoctorById)

  .get("/wallets/exists", doesADoctorHaveAWalletHandler)

  .post("/validate-wallet-pin-code", authenticateWalletDoctorHandler)

  .post("/wallets", addDoctorAWalletHandler)

  .get("/wallets", authenticateWalletUser, getDoctorWalletHandler)

  .patch("/wallet-transactions", authenticateWalletUser, performAWalletTransactionHandler)

  .patch("/wallet-recharge", authenticateWalletUser, rechargeDoctorWalletHandler)

  .get("/credit-card-configuration", configureCreditCardPaymentHandler)

  .post("/credit-card-payment", makeCreditCardPaymentHandler)

  .get("/patient/:patientId/prescription", getPatientPrescriptionsHandler)

  .post("/patient/:patientId/prescription", createPatientPrescriptionHandler)

  .put("/prescriptions/:prescriptionId/medicine/:medicineId", updateMedicineAndDosageHandler)

  .put("/prescriptions/:prescriptionId/", addMedicineToPatientPrescriptionHandler)

  .put("/prescriptions/:prescriptionId/submit", submitPrescriptionHandler)

  .get("/notifications", getAllNotificationsForDoctorHandler)

  .get("/patients/:patientId/health-records", getPatientHealthRecordsByDoctor)

  .post("/patients/:patientId/health-record", doctorAddPatientHealthRecord)

  .get("/general-info", getDoctorPatientGeneralInfo);

export default doctorRouter;
