import { Paper, Button } from "@mui/material";
import "../../css/PatientInfo.css";
import { useParams, useNavigate } from "react-router-dom";
import useGetPatient from "../../hooks/useGetPatientInfo";
import { Typography } from "@mui/material";
import { Person, Cake, Wc, Email, Phone } from "@mui/icons-material";

export default function PatientInfo() {
  const patientId = useParams().patientId;
  const patient = useGetPatient(patientId!).data;
  const history = useNavigate();

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
        <Button
          variant="contained"
          onClick={() => history("/patients")}
          style={{ marginTop: "1rem" }}
        >
          Back to Patient List
        </Button>
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
            style={{ fontSize: "1.2rem", lineHeight: "2rem" }}
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
