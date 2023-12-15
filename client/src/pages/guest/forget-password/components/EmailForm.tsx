import React, { useContext, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { sendEmailRequest } from "../services/services";
import { ForgetPasswordContext } from "../contexts/ForgetPasswordContext";

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const { setUserData, setStep, setError } = useContext(ForgetPasswordContext);
  const [error, setErrorState] = useState<string>("");
  const isValidEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };
  const isSubmitDisabled = !isValidEmail(email); 
  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await sendEmailRequest(email);
      setUserData(response.data);
      setErrorState("");
      setStep(2);
    } catch (error: any) {
      console.error(error);
      setErrorState(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleEmailSubmit}
        style={{ textAlign: "center", maxWidth: "400px", width: "100%", padding: "16px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!isValidEmail(email) && !!email}
            helperText={!isValidEmail(email) && !!email ? "Invalid email address" : ""}
          />
          {error && (
            <Typography variant="body2" color="error" style={{ fontSize: "14px" }}>
              {error}
            </Typography>
          )}
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "100%" }}
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EmailForm;
