import { Button, TextField } from "@mui/material";
import { sendPasswordResetRequest } from "../services/services";
import { useContext, useState } from "react";
import { ForgetPasswordContext } from "../contexts/ForgetPasswordContext";

const PasswordResetForm = () => {
  const { setError } = useContext(ForgetPasswordContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await sendPasswordResetRequest(password, confirmPassword);
      setError("");
    } catch (error: any) {
      console.log(error);
      setError(error.response.data?.message);
    }
  };
  return (
    <form onSubmit={handlePasswordSubmit}>
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default PasswordResetForm;
