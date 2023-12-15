import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import "../../css/PatientRegistrationFormStyle.css";
import { config } from "../../configuration";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { patientDashboardRoute } from "../../data/routes/patientRoutes";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MenuItem } from "@mui/material";

interface FormData {
  username: string;
  password: string;
  email: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  mobileNumber: string;
  emergencyContact: {
    fullname: string;
    mobileNumber: string;
    relationToPatient: string;
  };
}

const PatientRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    emergencyContact: {
      fullname: "",
      mobileNumber: "",
      relationToPatient: "",
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenderChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmergencyContactChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData: FormData = { ...prevData };

      if (name.startsWith("emergencyContact.")) {
        const fieldName = name.split(".")[1];
        (updatedData.emergencyContact as any)[fieldName] = value;
      } else {
        (updatedData as any)[name] = value;
      }

      return updatedData;
    });
  };

  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(`${config.serverUri}/auth/registration`, formData);
      const response = await axios.post(`${config.serverUri}/auth/login`, {
        username: formData.username,
        password: formData.password,
      });

      const data = response.data;
      login(data.accessToken, data.role);
      navigate(patientDashboardRoute.path);
    } catch (error: any) {
      setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <div className="registration-container">
      <Card sx={{ minWidth: 275, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" color="primary" fontSize="1.8rem" fontWeight="bold" gutterBottom>
            Patient Registration Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              label="Username"
              placeholder="Enter Your Username"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              label="Password"
              placeholder="Enter Your Password"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              label="Email"
              placeholder="Enter Your Email"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              label="Name"
              placeholder="Enter Your Full Name"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              label="Date of Birth"
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <TextField
              select
              name="gender"
              value={formData.gender}
              onChange={handleGenderChange}
              label="Gender"
              fullWidth
              required
              margin="normal"
            >
              <MenuItem value="" disabled>
                Choose your gender
              </MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
            <TextField
              type="number"
              name="mobileNumber"
              inputProps={{ min: "0" }}
              value={formData.mobileNumber}
              onChange={handleInputChange}
              label="Mobile Number"
              placeholder="Enter Your Mobile Number"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              type="text"
              name="emergencyContact.fullname"
              value={formData.emergencyContact.fullname}
              onChange={handleEmergencyContactChange}
              label="Emergency Contact Full Name"
              placeholder="Full Name"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              type="number"
              name="emergencyContact.mobileNumber"
              value={formData.emergencyContact.mobileNumber}
              onChange={handleEmergencyContactChange}
              label="Emergency Contact Mobile Number"
              placeholder="Mobile Number"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              type="text"
              name="emergencyContact.relationToPatient"
              value={formData.emergencyContact.relationToPatient}
              onChange={handleEmergencyContactChange}
              label="Emergency Contact Relation to Patient"
              placeholder="Relation to Patient"
              fullWidth
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 20, width: "50%" }}
            >
              Register
            </Button>
          </form>
          <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
            {error}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientRegistrationForm;
