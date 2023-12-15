import { AttachMoney, Email, Person, Phone} from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import WorkIcon from '@mui/icons-material/Work';
import BadgeIcon from '@mui/icons-material/Badge';
import useGetDoctor from "../../../hooks/useGetDoctor";
import { DateRangeIcon } from "@mui/x-date-pickers";
import SchoolIcon from '@mui/icons-material/School';

const ViewDoctorDetails: React.FC = () => {
const navigate = useNavigate();
const location = useLocation();
const doctorId = location.state?.doctorId;
const doctor = useGetDoctor(doctorId).data;
console.log(doctor);

  if (!doctor) return <p>Loading... </p>;

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
  <Box marginBottom="2rem">
    <Typography variant="h5" sx={{ fontSize: "2rem", marginBottom: "1rem" }}>
      <Person fontSize="large" /> {doctor.name}
    </Typography>
  </Box>
    <Paper elevation={1} sx={{ width: '90%', marginBottom: '2rem'}}>
      <Box sx={{ margin: '2rem' }}>
      <Box display="flex" justifyContent="center" marginBottom="2rem">
  <BadgeIcon fontSize="large" />{" "}
  <Typography variant="h5" sx={{ fontSize: "2rem", marginBottom: "1rem" }}>
   Personal Details
  </Typography>
</Box>
      <Typography
        variant="h6"
        component="span"
        style={{ fontSize: "1.5rem", lineHeight: "2rem" }}
      >
      </Typography>
      <div className="patientInfoDetails">
        <div className="patientInfoDetail">
          <Typography
            variant="h6"
            component="span"
            style={{ fontSize: "1.2rem", lineHeight: "2rem" }}
          >
            <Person fontSize="small" />{" "}
            <Typography variant="body2" component="span" color="textSecondary">
              Name:
            </Typography>{" "}
            {doctor.name}
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
            {doctor.email}
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
            {doctor.mobileNumber}
          </Typography>
        </div>
      </div>
      </Box>
    </Paper>

    <Paper elevation={3} sx={{ width: '90%', marginBottom: '2rem'}}>

        <Box sx={{ margin: '2rem' }}>
      <Box display="flex" justifyContent="center" marginBottom="2rem">
        <WorkIcon fontSize="large" />{" "}
  <Typography variant="h5" sx={{ fontSize: "2rem", marginBottom: "1rem"}}>
   Professional Details
  </Typography>
</Box>
      <Typography
        variant="h6"
        component="span"
        style={{ fontSize: "1.5rem", lineHeight: "2rem" }}
      >
      </Typography>
      <div className="patientInfoDetails">
        <div className="patientInfoDetail">
          <Typography
            variant="h6"
            component="span"
            style={{ fontSize: "1.2rem", lineHeight: "2rem" }}
          >

            <WorkIcon fontSize="small" />{" "}
            <Typography variant="body2" component="span" color="textSecondary">
              Speciality:
            </Typography>{" "}
            {doctor.speciality}
          </Typography>
        </div>
        <div>
          <Typography
            variant="h6"
            component="span"
            style={{ fontSize: "1.2rem", lineHeight: "2rem" }}
          >
           <AttachMoney fontSize="small" />{" "}
            <Typography variant="body2" component="span" color="textSecondary">
              Hourly Rate:
            </Typography>{" "}
            {doctor.hourlyRate}
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
              Affiliation:
            </Typography>{" "}
            {doctor.affiliation}
          </Typography>
        </div>
        <div className="patientInfoDetail">
          <Typography
            variant="h6"
            component="span"
            style={{ fontSize: "1.2rem", lineHeight: "2rem" }}
          >
          </Typography>
        </div>
        <div className="patientInfoDetail">
          <Typography
            variant="h6"
            component="span"
            style={{ fontSize: "1.2rem", lineHeight: "2rem" }}
          >
            <SchoolIcon fontSize="small" />{" "}
            <Typography variant="body2" component="span" color="textSecondary">
              Educational Background:
            </Typography>{" "}
            {doctor.educationalBackground}
          </Typography>
        </div>
        <div className="patientInfoDetail">
          <Typography
            variant="h6"
            component="span"
            style={{ fontSize: "1.2rem", lineHeight: "2rem" }}
          >
            <DateRangeIcon fontSize="small" />{" "}
            <Typography variant="body2" component="span" color="textSecondary">
              Available Slots:
            </Typography>{" "}
            {doctor.availabilityTime}
          </Typography>
        </div>


      </div>
      <Box display="flex" justifyContent="center" marginBottom="2rem">
        <Button variant="contained" color="primary" onClick={() => navigate('')}>
          Book Appointment
        </Button>
      </Box>
      </Box>
    </Paper>
    <Box display="flex" justifyContent="center" marginBottom="2rem">
          <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
            Back to Doctors
          </Button>
        </Box>
    </Box>
  );
};

export default ViewDoctorDetails;
