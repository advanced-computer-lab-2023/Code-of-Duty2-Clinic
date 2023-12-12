import express from "express";
import { getPatientById } from "../../controllers/patients/getPatientById";
import { getPatientInfo } from "../../controllers/patients/getPatientInfo";
import { updatePatientPassword } from "../../controllers/patients/patientUpdatePassword";
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
} from "../../controllers/payments/credit-cards";

const patientRouter = express.Router();

patientRouter.use(authenticateUser);
patientRouter.use(authorizeUser(UserRole.PATIENT));

patientRouter

  .get("/patient-info", getPatientInfo)

  .patch("/change-password", updatePatientPassword)

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

  .get("/:patientId", getPatientById);

export default patientRouter;
