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
import { displayError } from "../../../utils/displayError";
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
  const isWalletAlreadyCreated = useQuery({
    queryKey: ["doesWalletExist"],
    queryFn: doesUserHasAWallet(walletExistsRoute),
  });
  const navigate = useNavigate();

  const [desiredCurrency, setDesiredCurrency] = useState("");
  const [pinCodeDigits, setPinCodeDigits] = useState(Array(5).fill(""));
  const [confirmPinCodeDigits, setConfirmPinCodeDigits] = useState(
    Array(5).fill("")
  );

  const { mutate, isError, error } = useMutation(
    createNewWallet(createNewWalletRoute),
    {
      onSuccess: () => {
        navigate(userWalletPageLink);
      },
    }
  );

  if (isWalletAlreadyCreated.isError) {
    return (
      <Typography variant="body2" color="error">
        {displayError(isWalletAlreadyCreated.error)}
      </Typography>
    );
  }
  const exists = isWalletAlreadyCreated.data;
  if (exists) {
    navigate(userWalletPageLink);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (pinCodeDigits !== confirmPinCodeDigits) {
      alert("Pin codes do not match!");
      return;
    }
    if (!desiredCurrency || desiredCurrency === "") {
      alert("Please select a currency");
      return;
    }
    mutate({
      desiredCurrency,
      pinCode: pinCodeDigits.concat().join(""),
      confirmPinCode: confirmPinCodeDigits.concat().join(""),
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
        <WalletPasswordInput
          pinCodeDigits={pinCodeDigits}
          setPinCodeDigits={setPinCodeDigits}
        />
        <WalletPasswordInput
          pinCodeDigits={confirmPinCodeDigits}
          setPinCodeDigits={setConfirmPinCodeDigits}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Wallet
        </Button>
      </form>
      {isError && (
        <Typography variant="body2" color="error">
          {displayError(error)}
        </Typography>
      )}
    </Container>
  );
};

export default CreateWalletForm;
