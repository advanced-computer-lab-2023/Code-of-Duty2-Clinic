import { Typography } from "@mui/material";
import axios from "axios";
import { config } from "../../../configuration";
import { useQuery } from "react-query";
import { displayError } from "../../../utils/displayError";
import { doesUserHasAWallet } from "../../../features/wallets/services/doesUserHasAWallet";
import WalletDoesNotExistComponent from "../../../features/wallets/wallet-viewing/WalletDoesNotExistComponent";
import ExistingWalletComponent from "../../../features/wallets/wallet-viewing/ExistingWalletComponent";

const validatePin = async (pinCode: string) => {
  await axios.post(`${config.serverUri}/doctors/validate-wallet-pin-code`, {
    pinCode,
  });
};

const ViewWallet: React.FC = () => {
  const { data, isError, error } = useQuery({
    queryKey: ["doesWalletExist"],
    queryFn: doesUserHasAWallet("doctors/wallets/exists"),
  });

  const exists = data;
  return (
    <>
      {exists ? (
        <ExistingWalletComponent validatePinFunction={validatePin} />
      ) : (
        <WalletDoesNotExistComponent walletCreationLink="/doctor/wallet/create" />
      )}
      {isError && (
        <Typography variant="body2" color="error">
          {displayError(error)}
        </Typography>
      )}
    </>
  );
};

export default ViewWallet;
