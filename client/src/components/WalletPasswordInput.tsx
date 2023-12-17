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
          onKeyDown={(event) => {
            if (event.key === 'Backspace' && digit === '' && index > 0) {
              // Move focus to the previous input when deleting the last digit
              const prevInput = document.getElementById(inputsIds[index - 1]);
              prevInput?.focus();
            }
          }}
          onInput={(event) => {
            const value = (event.target as HTMLInputElement).value;
            const sanitizedValue = value.replace(/\D/g, ''); // Remove non-numeric characters

            if (sanitizedValue !== digit) {
              // Only update state if the value has changed (excluding Backspace key)
              setPinCodeDigits((prevPassword) => {
                const newPassword = [...prevPassword];
                newPassword[index] = sanitizedValue.slice(0, 1); // Limit to one digit
                return newPassword;
              });
            }

            if (sanitizedValue.length === 1 && index < 4) {
              // Move focus to the next input when entering a digit
              const nextInput = document.getElementById(inputsIds[index + 1]);
              nextInput?.focus();
            }
          }}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*", // Allow only numeric characters
            style: { WebkitTextSecurity: showPassword ? "none" : "disc" },
          }}
          sx={{ minWidth: '40px', width: 'auto', marginRight: '8px' }}
        />
      ))}
      <IconButton onClick={handleClickShowPassword}>
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </Box>
  );
};

export default WalletPasswordInput;