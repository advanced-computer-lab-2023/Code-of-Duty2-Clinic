import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";

type WalletPasswordInputProps = {
  pinCodeDigits: Array<string>;
  setPinCodeDigits: React.Dispatch<React.SetStateAction<Array<string>>>;
};
const inputsIds = Array(5)
  .fill(0)
  .map((_, index) => `input-${uuidv4()}-${index}`);

console.log(inputsIds);

const WalletPasswordInput: React.FC<WalletPasswordInputProps> = ({
  pinCodeDigits,
  setPinCodeDigits,
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const value = event.target.value;
    if (value.length <= 1) {
      setPinCodeDigits((prevPassword) => {
        const newPassword = [...prevPassword];
        newPassword[index] = value;
        return newPassword;
      });
      if (value.length === 1 && index < 4) {
        const nextInput = document.getElementById(inputsIds[index + 1]);
        nextInput?.focus();
      }
    }
  };

  useEffect(() => document.getElementById(inputsIds[0])?.focus(), []);

  return (
    <Box display="flex" justifyContent="space-between" width={200}>
      {pinCodeDigits.map((digit, index) => (
        <TextField
          key={index}
          id={inputsIds[index]}
          type="password"
          value={digit}
          onChange={(event) => handleChange(event, index)}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]" }}
        />
      ))}
    </Box>
  );
};

export default WalletPasswordInput;
