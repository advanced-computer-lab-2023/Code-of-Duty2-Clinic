import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { sendEmailRequest } from "../services/services";
import { ForgetPasswordContext } from "../contexts/ForgetPasswordContext";

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const { setUserData, setStep, setError } = useContext(ForgetPasswordContext);
  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await sendEmailRequest(email);
      setUserData(response.data);
      setError("");
      setStep(2);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data?.message);
    }
  };
  return (
    <form onSubmit={handleEmailSubmit}>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default EmailForm;
