import { Router } from "express";
import {
  deletePasswordResetInfoHandler,
  resetPasswordHandler,
  resetPasswordRequestHandler,
  validateOTPHandler,
} from "../../controllers/auth/forgetPassword";

const router = Router();

router
  .post("/reset-password-request", resetPasswordRequestHandler)
  .delete("/delete-password-reset-info", deletePasswordResetInfoHandler)
  .post("/validate-password-reset-info", validateOTPHandler)
  .post("/reset-password", resetPasswordHandler);

export default router;
