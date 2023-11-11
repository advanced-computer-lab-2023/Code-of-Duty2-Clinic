import axios from "axios";
import { config } from "../../../configuration";

export function doesUserHasAWallet(walletexistsRoute: string) {
  return async () => {
    const response = await axios.get(`${config.serverUri}${walletexistsRoute}`);
    const { exists }: { exists: boolean } = response.data;
    return exists;
  };
}
