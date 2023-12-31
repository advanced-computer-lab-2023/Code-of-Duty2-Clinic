import { Box, Button, Card, CardContent, CardMedia, Grid, Typography, styled } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import UserData from "../../types/UserData";

const PatientItem = styled(Card)({
   display: "flex",
   flexDirection: "column",
   alignItems: "center",
   padding: 16,
   cursor: "pointer",
   textDecoration: "none",
   height:200,
   background: "linear-gradient(to bottom, #ffffff, #f0f0f0)", 
}) as typeof Card;
const PatientImage = styled(CardMedia)({
   width: 120,
   height: 0,
   borderRadius: "50%",
}) as typeof CardMedia;

const PatientInfo = styled(Typography)({
   fontWeight: "bold",
   textAlign: "center",
   marginBottom:20,
}) as typeof Typography;

const RedirectButton = styled(Button)({
   "&:hover": {
      backgroundColor: "gray",
   },
}) as typeof Button;
type PatientComponentProps = {
  patient: UserData;
};

const PatientComponent: FC<PatientComponentProps> = ({ patient }) => {
  const [firstName, lastName] = patient.name.split(" ");
  const getInitials = () => {
    return `${firstName.charAt(0)}${
      !!lastName?.length ? lastName.charAt(0) : ""
    }`;
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={patient.id}>
      <PatientItem
        component={Link}
        to={`/doctor/patient/${patient.id}${
          patient.supervisingPatientId
            ? `?spId=${patient.supervisingPatientId}`
            : ""
        }`}
      >
        <PatientImage image={patient.photoUrl || ""} content={getInitials()} />
        <CardContent sx={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
          <Box>
          <PatientInfo variant="body1">Name: {patient.name}</PatientInfo>
          <PatientInfo variant="subtitle2">
            Gender: {patient.gender}
          </PatientInfo>
          </Box>
         
          {!patient.supervisingPatientId && (
            <RedirectButton
              variant="contained"
              color="secondary"
              component={Link}
              to={`/doctor/chat?id=${patient.id}`}
            >
              Chat With Patient
            </RedirectButton>
          )}
        </CardContent>
      </PatientItem>
    </Grid>
  );
};

export default PatientComponent;
