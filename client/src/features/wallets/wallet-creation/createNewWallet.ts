import { CreateWalletParams } from "../../../types/CreateWalletParams";
import { config } from "../../../configuration";
import axios from "axios";

export function createNewWallet(createNewWalletRoute: string) {
  return async (newWallet: CreateWalletParams) => {
    await axios.post(`${config.serverUri}${createNewWalletRoute}`, newWallet);
  };
}
