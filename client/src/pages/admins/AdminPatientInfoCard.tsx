import { Paper, Button } from "@mui/material";
import "../../css/PatientInfo.css";
import { Typography } from "@mui/material";
import { Person, Cake, Wc, Email, Phone } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { Box } from "@mui/system";
import { handleRemoveUser } from "./Home";

// import "./PatientInfo.css";
export default function PatientInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state.user;

  // Only load when the patient info is fetched
  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="patientInfo">
      <h1 className="patientInfoPageTitle">Patient Info</h1>
      <PatientInfoCard
        name={patient.name}
        dob={patient.dateOfBirth.toString()}
        email={patient.email}
        gender={patient.gender}
        mobile={patient.mobileNumber}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
      <Box display="flex" flexDirection="column" gap={1} marginTop={2}>
  <Button
    variant="contained"
    onClick={() => 
    handleRemoveUser(patient.username, 'patient', navigate)}
    color="error"
  >
    Remove User
  </Button>
  <Button
    variant="contained"
    onClick={() => navigate(-1)}
  >
    Back
  </Button>
</Box>
      </div>
    </div>
  );
}

function PatientInfoCard({
  name,
  dob,
  email,
  gender,
  mobile,
}: {
  name: string;
  dob: string;
  email: string;
  gender: string;
  mobile: string;
}) {
  return (
    <Paper elevation={2} className="patientInfoCard">
      <Typography
        variant="h5"
        className="patientInfoTitle"
        style={{ fontSize: "2rem", marginBottom: "1rem" }}
      >
        <Person fontSize="large" /> Personal Information
      </Typography>

      <Typography
        variant="h6"
        component="span"
        style={{ fontSize: "1.5rem", lineHeight: "2rem" }}
      >
        <Person fontSize="small" />{" "}
        <Typography variant="body2" component="span" color="textSecondary">
          Name:
        </Typography>{" "}
        {name}
      </Typography>
      <div className="patientInfoDetails">
        <div className="patientInfoDetail">
          <Typography
            variant="h6"
            component="span"
            style={{ fontSize: "1.2rem", lineHeight: "2rem" }}
          >
            <Cake fontSize="small" />{" "}
            <Typography variant="body2" component="span" color="textSecondary">
              Date of Birth:
            </Typography>{" "}
            {dob}
          </Typography>
        </div>
        <div>
          <Typography
            variant="h6"
            component="span"
            style={{ fontSize: "1.2rem", lineHeight: "2rem" }}
          >
            <Wc fontSize="small" />{" "}
            <Typography variant="body2" component="span" color="textSecondary">
              Gender:
            </Typography>{" "}
            {gender}
          </Typography>
        </div>
        <div className="patientInfoDetail">
          <Typography
            variant="h6"
            component="span"
            style={{ fontSize: "1.2rem", lineHeight: "2rem" }}
          >
            <Email fontSize="small" />{" "}
            <Typography variant="body2" component="span" color="textSecondary">
              Email:
            </Typography>{" "}
            {email}
          </Typography>
        </div>
        <div className="patientInfoDetail">
          <Typography
            variant="h6"
            component="span"
            style={{ fontSize: "1.2rem", lineHeight: "1rem" }}
          >
            <Phone fontSize="small" />{" "}
            <Typography variant="body2" component="span" color="textSecondary">
              Mobile Number:
            </Typography>{" "}
            {mobile}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
