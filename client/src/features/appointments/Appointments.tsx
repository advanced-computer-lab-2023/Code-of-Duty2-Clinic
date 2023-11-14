import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../configuration";
import { Dayjs } from "dayjs";
import { Link } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { Card, FormControl, InputLabel, MenuItem } from "@mui/material";
import { styled } from "@mui/material";
import {
  getFormattedDate,
  getFormattedTime,
  getQueredDateTime,
} from "../../utils/formatter";
import { filterParams } from "../../utils/filterer";

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
}) as typeof Card;

const AppointmentInfo = styled(Typography)({
  fontWeight: "bold",
  textAlign: "center",
}) as typeof Typography;

type Props = {
  isPatient: boolean;
};

const Appointments: React.FC<Props> = ({ isPatient }) => {
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[] | undefined
  >();

  const [targetName, setTargetName] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState<Dayjs | null>();
  const [time, setTime] = useState<Dayjs | null>();

  const [error, setError] = useState("");

  useEffect(() => {
    fetchFilteredAppointments();
  }, [targetName, status, date, time]);

  const handleChangeTargetName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTargetName(event.target.value);
  };
  const handleAppointmentStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };
  const handleDateChange = (date: Dayjs | null) => {
    setDate(date);
  };
  const handleTimeChange = (time: Dayjs | null) => {
    setTime(time);
  };

  const fetchFilteredAppointments = async () => {
    try {
      setFilteredAppointments(undefined);
      const dateTimeStr = getQueredDateTime(date, time);
      const isTimeSet = dateTimeStr !== "" ? !!time : undefined;
      const params = filterParams({
        targetName,
        status,
        appointmentTime: dateTimeStr && new Date(dateTimeStr).toISOString(),
        isTimeSet,
      });
      const response = await axios.get(
        `${config.serverUri}/${
          isPatient ? "patients" : "doctors"
        }/appointments`,
        { params }
      );
      setFilteredAppointments(response.data);
      setError("");
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
        View Appointments
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <TextField
          label={`${isPatient ? "Doctor" : "Patient"} Name`}
          value={targetName}
          name="name"
          onChange={handleChangeTargetName}
          sx={{ marginRight: 2 }}
        />
        <FormControl>
          <InputLabel id="gender-label">Appointment Status</InputLabel>
          <Select
            labelId="appointment-status-label"
            name="status"
            value={status}
            onChange={handleAppointmentStatusChange}
            sx={{ width: "180px" }}
          >
            <MenuItem value="">---Not selected</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
            <MenuItem value="rescheduled">Rescheduled</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Enter Date"
            value={date}
            onChange={handleDateChange}
          />
          <TimePicker
            label="Enter Time"
            value={time}
            onChange={handleTimeChange}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchFilteredAppointments}
          sx={{ marginLeft: "30px" }}
        >
          Search
        </Button>
      </Box>

      <Grid container spacing={2}>
        {filteredAppointments
          ? filteredAppointments.length === 0
            ? "No Appointments Found"
            : filteredAppointments.map((appointment) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={appointment.appointmentId}
                >
                  <AppointmentItem
                    component={Link}
                    to={`/${isPatient ? "patient" : "doctor"}/appointment/${
                      appointment.appointmentId
                    }`}
                  >
                    {/* <DoctorImage image={doctor.image} /> */}
                    <CardContent>
                      <AppointmentInfo variant="subtitle1">
                        {isPatient ? "Doctor" : "Patient"} Name:{" "}
                        {appointment.user.name}
                      </AppointmentInfo>
                      <AppointmentInfo variant="subtitle2">
                        Appointment day:{" "}
                        {getFormattedDate(appointment.timePeriod.startTime)}
                      </AppointmentInfo>
                      <AppointmentInfo variant="subtitle2">
                        Appointment period:{" "}
                        {getFormattedTime(appointment.timePeriod.startTime)} -{" "}
                        {getFormattedTime(appointment.timePeriod.endTime)}
                      </AppointmentInfo>
                    </CardContent>
                  </AppointmentItem>
                </Grid>
              ))
          : "Loading ...."}
      </Grid>
      <p style={{ color: "red" }}>{error}</p>
    </Box>
  );
};

export default Appointments;
