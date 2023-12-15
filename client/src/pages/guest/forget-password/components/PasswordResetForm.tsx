import React, { useContext, useState } from "react";
import { Button, TextField, Typography, Container, CssBaseline, Paper, Box } from "@mui/material";
import { sendPasswordResetRequest } from "../services/services";
import { ForgetPasswordContext } from "../contexts/ForgetPasswordContext";
import { useNavigate } from "react-router-dom";

const PasswordResetForm = () => {
  const { setError } = useContext(ForgetPasswordContext);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [passwordStrengthError, setPasswordStrengthError] = useState("");

  const navigate = useNavigate();

  const isStrongPassword = (pass: string) => {
    // Add your password strength criteria here
    // For example, minimum length, uppercase, lowercase, number, and special character
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    return (
      pass.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setPasswordsMatchError(true);
      return;
    }

    // Check if password is strong
    if (!isStrongPassword(password)) {
      setError("Password is not strong enough");
      setPasswordStrengthError("Password is not strong enough");
      return;
    }

    try {
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
    <Container component="main" maxWidth="xs" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CssBaseline />
      <Paper elevation={3} style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form onSubmit={handlePasswordSubmit} style={{ width: "100%", marginTop: "20px" }}>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={password}
            error={passwordStrengthError !== ""}
            helperText={passwordStrengthError}
            onChange={(event) => {
              const newPassword = event.target.value;
              setPassword(newPassword);
              setPasswordsMatchError(confirmPassword !== newPassword);
              setPasswordStrengthError(isStrongPassword(newPassword) ? "" : "Password is not strong enough");
            }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            error={passwordsMatchError}
            helperText={passwordsMatchError ? "Passwords do not match" : ""}
            value={confirmPassword}
            onChange={(event) => {
              const newConfirmPassword = event.target.value;
              setConfirmPassword(newConfirmPassword);
              setPasswordsMatchError(password !== newConfirmPassword);
              setPasswordStrengthError(isStrongPassword(password) ? "" : "Password is not strong enough");
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "20px" }} disabled={passwordsMatchError || passwordStrengthError !== ""}>
            Submit
          </Button>
          {success && (
            <Typography variant="body2" style={{ color: "green", marginTop: "10px" }}>
              Password reset successfully
            </Typography>
          )}
        </form>
      </Paper>
      <Box mt={5} />
    </Container>
  );
};

export default PasswordResetForm;
