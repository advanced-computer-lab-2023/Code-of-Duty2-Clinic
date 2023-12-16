import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../configuration";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";
import { styled } from "@mui/material";
import { getFormattedDate, getFormattedTime } from "../utils/formatter";

interface Appointment {
  appointmentId: string;
  timePeriod: {
    startTime: string;
    endTime: string;
  };
  status: "upcoming" | "completed" | "cancelled" | "rescheduled";
  user: {
    id: string;
    name: string;
    imageUrl?: string;
  };
}

const AppointmentItem = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 16,
  cursor: "pointer",
  textDecoration: "none",
}) as typeof Card;

const AppointmentInfo = styled(Typography)({
  fontWeight: "bold",
  textAlign: "center",
}) as typeof Typography;

type Props = {
  isPatient: boolean;
};

const UpcomingAppointmentsCard: React.FC<Props> = ({ isPatient }) => {
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[] | undefined>();
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  const fetchAllAppointments = async () => {
    try {
      const response = await axios.get(
        `${config.serverUri}/${isPatient ? "patients" : "doctors"}/appointments`
      );
      setAllAppointments(response.data);
      setError("");
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    filterUpcomingAppointments();
  }, [allAppointments]);

  const filterUpcomingAppointments = () => {
    const currentDate = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(currentDate.getDate() + 3);

    const upcomingAppointments = allAppointments.filter(
      (appointment) => appointment.status === "upcoming"||appointment.status==='completed' &&
                       new Date(appointment.timePeriod.startTime) >= currentDate &&
                       new Date(appointment.timePeriod.startTime) <= threeDaysLater
    );

    setUpcomingAppointments(upcomingAppointments);
  };

  return (
    <Card style={{width:'55%',marginTop:'7%'}} >
      <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
        Upcoming Appointments in the Next 3 Days
      </Typography>

      {upcomingAppointments ? (
        upcomingAppointments.length === 0 ? (
          <Typography>No upcoming appointments in the next 3 days.</Typography>
        ) : (
          <Grid container spacing={2}>
            {upcomingAppointments.map((appointment) => (
              <Grid item key={appointment.appointmentId}>
                <AppointmentItem
                  component={Link}
                  to={`/${isPatient ? "patient" : "doctor"}/appointment/${appointment.appointmentId}`}
                >
                  <CardContent>
                    <AppointmentInfo variant="subtitle1">
                      {isPatient ? "Doctor" : "Patient"} Name: {appointment.user.name}
                    </AppointmentInfo>
                    <AppointmentInfo variant="subtitle2">
                      Appointment day: {getFormattedDate(appointment.timePeriod.startTime)}
                    </AppointmentInfo>
                    <AppointmentInfo variant="subtitle2">
                      Appointment period: {getFormattedTime(appointment.timePeriod.startTime)} - {getFormattedTime(appointment.timePeriod.endTime)}
                    </AppointmentInfo>
                  </CardContent>
                </AppointmentItem>
              </Grid>
            ))}
          </Grid>
        )
      ) : (
        <Typography>Loading ....</Typography>
      )}
      <p style={{ color: "red" }}>{error}</p>
    </Card>
  );
};

export default UpcomingAppointmentsCard;
