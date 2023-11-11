import axios from "axios";
import { config } from "../../../configuration";

export function doesUserHasAWallet(walletExistsRoute: string) {
  return async () => {
    const response = await axios.get(`${config.serverUri}${walletExistsRoute}`);
    const { exists }: { exists: boolean } = response.data;
    return exists;
  };
}
