import { Button, Modal, Typography } from "@mui/material";
import WalletComponent from "./Wallet";
import WalletPasswordInput from "../../../components/WalletPasswordInput";
import { UseMutationResult, UseQueryResult } from "react-query";
import { useState } from "react";
import { getErrorMessage } from "../../../utils/displayError";
import { Wallet } from "../../../types/Wallet";

type ExistingWalletComponentProps = {
  getWalletDetailsQuery: UseQueryResult<Wallet, unknown>;
  validatePinMutation: UseMutationResult<void, unknown, string, unknown>;
};
const ExistingWalletComponent: React.FC<ExistingWalletComponentProps> = ({
  getWalletDetailsQuery,
  validatePinMutation,
}) => {
  const [pinCodeDigits, setPinCodeDigits] = useState<Array<string>>(
    Array(5).fill("")
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validatePinMutation.mutate(pinCodeDigits?.concat().join(""));
  };

  if (getWalletDetailsQuery.isLoading) return <></>;
  return (
    <div>
      <Modal
        open={getWalletDetailsQuery.isError || validatePinMutation.isError}
        onClose={validatePinMutation.reset}
        sx={{ backgroundColor: "white" }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h6">Enter Wallet Pin</Typography>
          <WalletPasswordInput
            pinCodeDigits={pinCodeDigits}
            setPinCodeDigits={setPinCodeDigits}
          />
          {validatePinMutation.isError && (
            <Typography variant="body2" color="error">
              {getErrorMessage(validatePinMutation.error)}
            </Typography>
          )}
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
      {getWalletDetailsQuery.isSuccess && (
        <div>
          <WalletComponent
            balance={getWalletDetailsQuery.data?.amount!}
            currency={getWalletDetailsQuery.data?.currency!}
          />
          <Button href="https://stripe.com">Recharge</Button>
        </div>
      )}
    </div>
  );
};

export default ExistingWalletComponent;
