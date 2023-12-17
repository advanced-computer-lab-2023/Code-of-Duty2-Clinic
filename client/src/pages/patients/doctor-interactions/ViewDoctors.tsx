import React, { useState, useEffect } from "react";
import axios from "axios";
import { DoctorDetails } from "../../../types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { config } from "../../../configuration";
import { getQueriedDateTime } from "../../../utils/formatter";
import { filterParams } from "../../../utils/filterer";
import { useNavigate } from "react-router-dom";

const ViewDoctors = () => {
  const [filteredDoctors, setFilteredDoctors] = useState<
    DoctorDetails[] | undefined
  >();
  const [filterOptions, setFilterOptions] = useState({
    name: "",
    speciality: "",
  });

  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${config.serverUri}/patients/doctors`);
      setFilteredDoctors(response.data);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  const fetchFilteredDoctors = async () => {
    try {
      setFilteredDoctors(undefined);
      const dateTimeStr = getQueriedDateTime(date, time);
      const isTimeSet = dateTimeStr !== "" ? !!time : undefined;
      const params = filterParams({
        ...filterOptions,
        availabilityTime: dateTimeStr && new Date(dateTimeStr).toISOString(),
        isTimeSet,
      });
      const response = await axios.get(`${config.serverUri}/patients/doctors`, {
        params,
      });
      setFilteredDoctors(response.data);
      setError("");
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleFilterOptionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterOptions({
      ...filterOptions,
      [event.target.name]: event.target.value,
    });
  };

  const handleDateChange = (value: Dayjs | null) => {
    setDate(value);
  };

  const handleTimeChange = (value: Dayjs | null) => {
    setTime(value);
  };

  const handleSearchClick = () => {
    fetchFilteredDoctors();
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    fetchFilteredDoctors();
  }, [filterOptions, date, time]);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
        View Doctors
      </Typography>
      <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: "center", 
          marginBottom: 4 
        }}>     
        <TextField
          label="Name"
          value={filterOptions.name}
          name="name"
          onChange={handleFilterOptionsChange}
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Speciality"
          value={filterOptions.speciality}
          name="speciality"
          onChange={handleFilterOptionsChange}
          sx={{ marginRight: 2 }}
        />
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
          onClick={handleSearchClick}
          sx={{ marginLeft: "30px" }}
        >
          Search
        </Button>
      </Box>
    <Box sx={{ padding: 4 }}>
      <Box>
        <Grid container spacing={3}>
          {filteredDoctors?.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor._id}>
              <Card>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h5">{doctor.name}</Typography>
                  <Typography variant="h6">
                  <WorkIcon fontSize="small" sx={{marginRight: '1%'}} />
                    Specialty: {doctor.speciality}
                  </Typography>
                  <Typography variant="h6">
                    <AttachMoneyIcon fontSize="small" />
                    Session Price: {doctor.sessionPrice}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    onClick={() => navigate('/patient/doctors/details', { state: { doctorId: doctor._id.toString() } })}
                  >
                    View More Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    </Box>
  );
};


export default ViewDoctors;
