import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { v4 as uuidv4 } from "uuid";

type WalletPasswordInputProps = {
  pinCodeDigits: Array<string>;
  setPinCodeDigits: React.Dispatch<React.SetStateAction<Array<string>>>;
};

const WalletPasswordInput: React.FC<WalletPasswordInputProps> = ({
  pinCodeDigits,
  setPinCodeDigits,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputsIds = Array(5)
    .fill(0)
    .map((_, index) => `input-${uuidv4()}-${index}`);

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => document.getElementById(inputsIds[0])?.focus(), []);

  return (
    <Box display="flex" justifyContent="space-between" width={250}>
      {pinCodeDigits.map((digit, index) => (
        <TextField
          key={index}
          id={inputsIds[index]}
          type={showPassword ? "text" : "password"}
          value={digit}
          onChange={(event) => handleChange(event, index)}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]",
            style: { WebkitTextSecurity: showPassword ? "none" : "disc" },
          }}
          sx={{ width: 80 }}
        />
      ))}
      <IconButton onClick={handleClickShowPassword}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </Box>
  );
};

export default WalletPasswordInput;
