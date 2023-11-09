import axios from "axios";
import { config } from "../../../../configuration";
import User from "../../../../types/User";

export const sendEmailRequest = async (email: string) => {
  return await axios.post(`${config.serverUri}/auth/reset-password-request`, {
    email,
  });
};

export const sendOTPRequest = async (userData: User, otp: string) => {
  return await axios.post(
    `${config.serverUri}/auth/validate-password-reset-info`,
    { userData, otp }
  );
};

export const sendPasswordResetRequest = async (
  password: string,
  confirmPassword: string
) => {
  return await axios.post(
    `${config.serverUri}/auth/reset-password`,
    {
      password,
      confirmPassword,
    },
    { withCredentials: true }
  );
};
