import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Snackbar,
  TextField,
  Typography,
  SnackbarContent,
} from "@mui/material";
import { sendOTPRequest } from "../services/services";
import { ForgetPasswordContext } from "../contexts/ForgetPasswordContext";

const OTPForm = () => {
  const [otp, setOTP] = useState("");
  const { userData, setStep, setError } = useContext(ForgetPasswordContext);
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSnackbarOpen(false);
    }, 3000);

    return () => clearTimeout(timeoutId);

  }, []);

  const handleOTPSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendOTPRequest(userData, otp);
      setError("");
      setErrorMessage("");
      setSnackbarOpen(true);
      setStep(3);
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "An error occurred");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", 
      }}
    >
      <form
        onSubmit={handleOTPSubmit}
        style={{ textAlign: "center", maxWidth: "400px", width: "100%", padding: "16px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            margin="normal"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        </div>
        <Button type="submit" variant="contained" color="primary" style={{ width: "100%" }}>
          Submit
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <SnackbarContent
          message={<Typography variant="body1">{errorMessage || "OTP has been sent successfully!"}</Typography>}
          style={{
            textAlign: "center",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            backgroundColor: errorMessage ? "red" : "green",
          }}
        />
      </Snackbar>
    </div>
  );
};

export default OTPForm;
