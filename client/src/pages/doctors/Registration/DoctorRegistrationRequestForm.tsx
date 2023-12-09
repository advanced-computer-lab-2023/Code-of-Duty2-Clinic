import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import axios from "axios";
import { config } from "../../../configuration";
import StepOneForm from "./components/stepOne";
import StepTwoForm from "./components/stepTwo";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../utils/displayError";

export interface IFormOneData {
  username: string;
  password: string;
  email: string;
  name: string;
  gender: string;
  mobileNumber: string;
  dateOfBirth: string;
}
export interface IFormTwoData {
  hourlyRate: string;
  affiliation: string;
  educationalBackground: string;
  medicalDegree: string;
  speciality?: string;
}

export interface IExperienceFile {
  url: string;
  DocumentType: string;
  name: string;
}

interface FormData {
  username: string;
  password: string;
  email: string;
  name: string;
  gender: string;
  mobileNumber: string;
  dateOfBirth: string;
  hourlyRate: string;
  affiliation: string;
  educationalBackground: string;
  medicalDegree: string;
  speciality?: string;
  status: string;
}

const DoctorRegistrationRequestForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const stepOneData = useRef<IFormOneData>(null!);
  const stepTwoData = useRef<IFormTwoData>(null!);

  const navigate = useNavigate();

  function handleStepOneData(formData: IFormOneData) {
    stepOneData.current = formData;
  }

  function handleStepTwoData(formData: IFormTwoData) {
    stepTwoData.current = formData;
  }

  async function submitRequest() {
    const formData: FormData = {
      ...stepOneData.current,
      ...stepTwoData.current,
      status: "pending documents upload",
    };
    try {
      await axios.post(
        `${config.serverUri}/auth/doctor-registration`,
        formData
      );
      navigate("/login/doctor");
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error));
    }
  }

  const steps = ["Personal Info", "Experience"];

  const handleNext = () => {
    setActiveStep((activeStep) => activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((activeStep) => activeStep - 1);
  };

  return (
    <Card sx={{ maxWidth: 450, margin: "auto" }}>
      <CardContent>
        <Stack
          minWidth={"300px"}
          margin={"auto"}
          sx={{ backgroundColor: "white" }}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography fontSize={20} fontWeight={500} textAlign={"center"}>
            Doctor Registration Request
          </Typography>
          <Container>
            <Stepper
              sx={{ marginTop: 5, marginBottom: 2 }}
              activeStep={activeStep}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <div>
              {activeStep === 0 && (
                <StepOneForm
                  key={activeStep}
                  passFormDataToParent={(data: IFormOneData) =>
                    handleStepOneData(data)
                  }
                />
              )}
              {activeStep === 1 && (
                <StepTwoForm
                  key={activeStep}
                  passFormDataToParent={(data: IFormTwoData) =>
                    handleStepTwoData(data)
                  }
                />
              )}

              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                marginBottom={7}
              >
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={
                    activeStep === steps.length - 1 ? submitRequest : handleNext
                  }
                >
                  {activeStep === steps.length - 1 ? "Submit Request" : "Next"}
                </Button>
              </Stack>
            </div>
          </Container>
          <Typography
            fontSize={15}
            fontWeight={350}
            textAlign={"center"}
            color="red"
          >
            {errorMessage}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DoctorRegistrationRequestForm;
