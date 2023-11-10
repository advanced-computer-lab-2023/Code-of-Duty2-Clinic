import { Button, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { sendOTPRequest } from "../services/services";
import { ForgetPasswordContext } from "../contexts/ForgetPasswordContext";
const OTPForm = () => {
  const [otp, setOTP] = useState("");
  const { userData, setStep, setError } = useContext(ForgetPasswordContext);
  const handleOTPSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await sendOTPRequest(userData, otp);
      setError("");
      setStep(3);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data?.message);
    }
  };

  return (
    <div>
      <Typography>
        An OTP is sent to the submitted email if it belongs to a registered user
      </Typography>
      <form onSubmit={handleOTPSubmit}>
        <TextField
          label="OTP"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default OTPForm;
