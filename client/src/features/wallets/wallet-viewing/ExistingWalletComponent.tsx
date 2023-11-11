import { Button, Modal, Typography } from "@mui/material";
import Wallet from "./Wallet";
import { useNavigate } from "react-router-dom";
import WalletPasswordInput from "../../../components/WalletPasswordInput";
import { useMutation } from "react-query";
import { useState } from "react";
import { displayError } from "../../../utils/displayError";

type ExistingWalletComponentProps = {
  validatePinFunction: (pinCode: string) => Promise<void>;
};
const ExistingWalletComponent: React.FC<ExistingWalletComponentProps> = ({
  validatePinFunction,
}) => {
  const validatePinMutation = useMutation(validatePinFunction);
  const [pinCodeDigits, setPinCodeDigits] = useState<Array<string>>(
    Array(5).fill("")
  );

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validatePinMutation.mutate(pinCodeDigits?.concat().join(""));
  };
  return (
    <div>
      <Modal
        open={!validatePinMutation.isSuccess}
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
              {displayError(validatePinMutation.error)}
            </Typography>
          )}
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
      {validatePinMutation.isSuccess && (
        <div>
          <Wallet balance={100} />
          <Button onClick={() => navigate("https://stripe.com")}>
            Recharge
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExistingWalletComponent;
