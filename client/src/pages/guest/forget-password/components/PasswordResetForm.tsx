import { Button, TextField } from "@mui/material";
import { sendPasswordResetRequest } from "../services/services";
import { useContext, useState } from "react";
import { ForgetPasswordContext } from "../contexts/ForgetPasswordContext";
import { useNavigate } from "react-router-dom";

const PasswordResetForm = () => {
  const { setError } = useContext(ForgetPasswordContext);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      await sendPasswordResetRequest(password, confirmPassword);
      setError("");
      setSuccess(true);
      navigate("/");
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
      {success && <p style={{ color: "green" }}>Password reset successfully</p>}
    </form>
  );
};

export default PasswordResetForm;
