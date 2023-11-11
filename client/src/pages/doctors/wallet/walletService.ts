import axios from "axios";
import { config } from "../../../configuration";

export const getPatientWallet = async () => {
  const response = await axios.get(`${config.serverUri}/patients/wallet`);
  return response.data;
};
