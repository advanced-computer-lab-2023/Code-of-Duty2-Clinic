import { useContext, useEffect } from "react";
import socket from "../../services/Socket";
import { UserContext } from "../../contexts/UserContext";
import LatestHealthRecordCard from "../../components/healthRecordDash";
import LatestPrescriptionCard from "../../components/latestPrescriptionDash";
import PatientInfoCard from "../../components/patientInfoDash";
import UpcomingAppointmentsCard from "../../components/upcomingAppointmentsDash";
import { Box, Grid, Typography } from "@mui/material";

export default function Home() {
  const { user } = useContext(UserContext);
  useEffect(() => {
    socket.on("message", (name) => {
      console.log("message", "message sent from doctor " + name);
    });
    socket.emit("message", {
      destinationId: "65561ebbec181d18d2476592",
      senderName: user!.name,
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <>
     <Box ml={"3%"} marginBottom='3%'>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Patient Dashboard
      </Typography>
    </Box>
    <div style={{ display: "flex", flexDirection: "row"}}>
      <div style={{ flex: "1",marginLeft:'20%' }}>
        <PatientInfoCard />
      </div>
      <div style={{ flex: "1"}}>
        <LatestHealthRecordCard />
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: "1", marginLeft:'20%',marginTop:'1%' }}>
        <LatestPrescriptionCard />
      </div>
      <div style={{ flex: "1"}}>
        <UpcomingAppointmentsCard isPatient={true} />
      </div>
    </div>
  </>
);
}
