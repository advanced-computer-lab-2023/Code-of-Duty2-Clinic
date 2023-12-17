import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Container,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { config } from "../../../configuration";
import { getErrorMessage } from "../../../utils/displayError";

interface IFormData {
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
  speciality: string;
  status: string;
}

const DoctorRegistrationRequestForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
    email: "",
    name: "",
    gender: "",
    mobileNumber: "",
    dateOfBirth: "",
    hourlyRate: "",
    affiliation: "",
    educationalBackground: "",
    medicalDegree: "",
    speciality: "",
    status: "pending documents upload"
  });

  const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const navigate = useNavigate();

  const handleChange = (field: keyof IFormData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    validateForm(); // Validate the form on each field change
  };

  const validateForm = () => {
    const isPasswordValid = strongPasswordRegex.test(formData.password);
    const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);
    const isHourlyRateValid = parseFloat(formData.hourlyRate) >= 0;

    const isValid =
      Object.values(formData).every((field) => field !== "") &&
      isPasswordValid &&
      isEmailValid &&
      isHourlyRateValid;

    setFormValid(isValid);
  };

  const handleSubmit = async () => {
    console.log("Submit Request:", formData);

    try {
      await axios.post(`${config.serverUri}/auth/doctor-registration`, formData);
      navigate("/login/doctor");
    } catch (error: any) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  useEffect(() => {
    validateForm();
  }, []);

  return (
    <Container
      component="main"
      maxWidth="md"
      style={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Paper elevation={3} style={{ padding: 20, width: "100%" }}>
        <Typography variant="h5" align="center" fontSize="1.9rem" fontWeight="bold" gutterBottom>
          Doctor Registration Request
        </Typography>

        <Grid container spacing={2}>
          {/* Personal Information */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Username"
              fullWidth
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              fullWidth
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Gender</InputLabel>
            <Select
              fullWidth
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value as string)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: 25 }}>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              value={formData.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            />
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              fullWidth
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              label="Mobile Number"
              fullWidth
              value={formData.mobileNumber}
              onChange={(e) => handleChange("mobileNumber", e.target.value)}
            />
          </Grid>

          {/* Professional Information */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Hourly Rate In USD"
              fullWidth
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              value={formData.hourlyRate}
              onChange={(e) => handleChange("hourlyRate", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Affiliation"
              fullWidth
              value={formData.affiliation}
              onChange={(e) => handleChange("affiliation", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Educational Background"
              fullWidth
              value={formData.educationalBackground}
              onChange={(e) => handleChange("educationalBackground", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Medical Degree"
              fullWidth
              value={formData.medicalDegree}
              onChange={(e) => handleChange("medicalDegree", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Speciality"
              fullWidth
              value={formData.speciality}
              onChange={(e) => handleChange("speciality", e.target.value)}
            />
          </Grid>
        </Grid>

        {errorMessage && (
          <Typography color="error" align="center">
            {errorMessage}
          </Typography>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <Button
            style={{ width: "30%" }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!formValid}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default DoctorRegistrationRequestForm;
