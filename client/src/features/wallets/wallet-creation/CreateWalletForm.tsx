import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import {
  Button,
  TextField,
  Container,
  Typography,
  Autocomplete,
} from "@mui/material";
import { doesUserHasAWallet } from "../services/doesUserHasAWallet";
import { getErrorMessage } from "../../../utils/displayError";
import { useNavigate } from "react-router-dom";
import { createNewWallet } from "./createNewWallet";
import WalletPasswordInput from "../../../components/WalletPasswordInput";
import { famousCurrencySymbols } from "../../../data/misc/worldCurrencies";

type CreateWalletFormProps = {
  walletExistsRoute: string;
  userWalletPageLink: string;
  createNewWalletRoute: string;
};
const CreateWalletForm: React.FC<CreateWalletFormProps> = ({
  walletExistsRoute,
  userWalletPageLink,
  createNewWalletRoute,
}) => {
  const isWalletAlreadyCreated = useQuery(
    ["doesWalletExist"],
    doesUserHasAWallet(walletExistsRoute)
  );

  const navigate = useNavigate();

  const [desiredCurrency, setDesiredCurrency] = useState("");
  const [pinCodeDigits, setPinCodeDigits] = useState(Array(5).fill(""));
  const [confirmPinCodeDigits, setConfirmPinCodeDigits] = useState(
    Array(5).fill("")
  );

  const { mutate, isError, error, isLoading } = useMutation(
    createNewWallet(createNewWalletRoute),
    {
      onSuccess: () => {
        navigate(userWalletPageLink);
      },
    }
  );

  if (isWalletAlreadyCreated.isLoading) return <></>;
  if (isWalletAlreadyCreated.isError) {
    return (
      <Typography variant="body2" color="error">
        {getErrorMessage(isWalletAlreadyCreated.error)}
      </Typography>
    );
  }
  const exists = isWalletAlreadyCreated.data;
  if (exists) {
    navigate(userWalletPageLink);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const pinCode = pinCodeDigits.concat().join("");
    const confirmPinCode = confirmPinCodeDigits.concat().join("");

    if (pinCode !== confirmPinCode) {
      alert("Pin codes do not match!");
      return;
    }
    if (!desiredCurrency || desiredCurrency === "") {
      alert("Please select a currency");
      return;
    }
    mutate({
      desiredCurrency,
      pinCode,
      confirmPinCode,
    });
  };
  return (
    <Container style={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h4" sx={{ marginBottom: 5 }}>
        Create New Wallet
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Autocomplete
          options={famousCurrencySymbols}
          getOptionLabel={(option) => option}
          onChange={(_, value) => setDesiredCurrency(value || "")}
          renderInput={(params) => (
            <TextField {...params} label="Select a currency" />
          )}
        />
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="pin-code">Enter a 5 digit pin code</label>
          <WalletPasswordInput
            pinCodeDigits={pinCodeDigits}
            setPinCodeDigits={setPinCodeDigits}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label htmlFor="pin-code">Confirm your pin code</label>
          <WalletPasswordInput
            pinCodeDigits={confirmPinCodeDigits}
            setPinCodeDigits={setConfirmPinCodeDigits}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          Create Wallet
        </Button>
      </form>
      {isError && (
        <Typography variant="body2" color="error">
          {getErrorMessage(error)}
        </Typography>
      )}
    </Container>
  );
};

export default CreateWalletForm;
