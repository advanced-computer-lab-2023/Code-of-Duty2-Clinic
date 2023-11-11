import axios from "axios";
import { config } from "../../configuration";

type LoginCredentials = {
  username: string;
  password: string;
};
export const loginService = async ({
  username,
  password,
}: LoginCredentials) => {
  const response = await axios.post(`${config.serverUri}/auth/login`, {
    username,
    password,
  });
  return response.data;
};

export const doctorLoginService = async ({
  username,
  password,
}: LoginCredentials) => {
  const response = await axios.post(`${config.serverUri}/auth/doctor-login`, {
    username,
    password,
  });
  return response.data;
};
