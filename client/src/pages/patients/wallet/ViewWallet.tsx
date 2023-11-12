import { Typography } from "@mui/material";
import axios from "axios";
import { config } from "../../../configuration";
import { useMutation, useQuery } from "react-query";
import { displayError } from "../../../utils/displayError";
import { doesUserHasAWallet } from "../../../features/wallets/services/doesUserHasAWallet";
import WalletDoesNotExistComponent from "../../../features/wallets/wallet-viewing/WalletDoesNotExistComponent";
import ExistingWalletComponent from "../../../features/wallets/wallet-viewing/ExistingWalletComponent";
import { Wallet } from "../../../types/Wallet";

async function validatePin(pinCode: string) {
  await axios.post(`${config.serverUri}/patients/validate-wallet-pin-code`, {
    pinCode,
  });
}
async function getWalletDetails(): Promise<Wallet> {
  const response = await axios.get(`${config.serverUri}/patients/wallets`);
  return response.data;
}

const ViewWallet: React.FC = () => {
  const getWalletDetailsQuery = useQuery(["wallets"], getWalletDetails, {
    retry: 1,
  });

  const validatePinMutation = useMutation(validatePin, {
    onSuccess: () => getWalletDetailsQuery.refetch(),
  });

  const doesWalletExistsQuery = useQuery(
    ["doesWalletExist"],
    doesUserHasAWallet("/patients/wallets/exists")
  );

  const exists = doesWalletExistsQuery.data;
  if (doesWalletExistsQuery.isLoading) return <></>;
  return (
    <>
      {exists ? (
        <ExistingWalletComponent
          getWalletDetailsQuery={getWalletDetailsQuery}
          validatePinMutation={validatePinMutation}
        />
      ) : (
        <WalletDoesNotExistComponent walletCreationLink="/patient/wallet/create" />
      )}
      {doesWalletExistsQuery.isError && (
        <Typography variant="body2" color="error">
          {displayError(doesWalletExistsQuery.error)}
        </Typography>
      )}
    </>
  );
};

export default ViewWallet;
