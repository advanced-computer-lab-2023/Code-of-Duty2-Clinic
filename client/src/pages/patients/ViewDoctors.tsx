import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { DoctorDetails } from '../../types';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import {Dayjs} from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { config } from '../../utils/config';
import { getQueredDateTime } from '../../utils/formatter';
import { filterParams } from '../../utils/filterer';

const DoctorItem = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 16,
  cursor: 'pointer',
}) as typeof Card;

const DoctorImage = styled(CardMedia)({
  width: 120,
  height: 120,
  borderRadius: '50%',
}) as typeof CardMedia;

const DoctorInfo = styled(Typography)({
  fontWeight: 'bold',
  textAlign: 'center',
}) as typeof Typography;

const DoctorPrice = styled(Typography)({
  color: '#4caf50',
  textAlign: 'center',
}) as typeof Typography;

const ViewDoctors = () => {
  const [filteredDoctors, setFilteredDoctors] = useState<DoctorDetails[] | undefined>();
  const [filterOptions, setFilterOptions] = useState({
    name: '',
    speciality: '',
  });

  const [date, setDate] = useState<Dayjs | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);

  const [error, setError] = useState('');

  const patientId = useLocation().pathname.split('/')[2];

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${config.serverUri}/patients/${patientId}/doctors`);
      setFilteredDoctors(response.data);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  const fetchFilteredDoctors = async () => {
    try {
      setFilteredDoctors(undefined);
      const dateTimeStr = getQueredDateTime(date, time);
      const isTimeSet = dateTimeStr !== '' ? !!time :undefined; 
      const params = filterParams({
        ...filterOptions,
        availabilityTime: dateTimeStr && new Date(dateTimeStr).toISOString(),
        isTimeSet,
      })
      const response = await axios.get(`${config.serverUri}/patients/${patientId}/doctors`, { params });
      setFilteredDoctors(response.data);
      setError('');
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleFilterOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({ ...filterOptions, [event.target.name]: event.target.value });
  };

  const handleDateChange = (value: Dayjs | null) => {
    setDate(value);
  }

  const handleTimeChange = (value: Dayjs | null) => {
    setTime(value);
  }

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
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
          View Doctors
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
          <TextField label="Name" value={filterOptions.name} name='name' onChange={handleFilterOptionsChange} sx={{ marginRight: 2 }} />
          <TextField label="Speciality" value={filterOptions.speciality} name='speciality' onChange={handleFilterOptionsChange} sx={{ marginRight: 2 }} />
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
          <Button variant="contained" color="primary" onClick={handleSearchClick} sx={{marginLeft: '30px'}}>
            Search
          </Button>
        </Box>

        <Grid container spacing={2}>
          {filteredDoctors ? (
            filteredDoctors.length === 0 ? (
              'No Doctors Found'
            ) : (
              filteredDoctors.map((doctor) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={doctor._id}>
                  <DoctorItem component={Link} to={`/patient/${patientId}/doctors/${doctor._id}`}>
                    <CardContent>
                      <DoctorInfo variant="subtitle1">Name: {doctor.name}</DoctorInfo>
                      <DoctorInfo variant="subtitle2">Speciality: {doctor.speciality}</DoctorInfo>
                      <DoctorPrice variant="body1">Session Price: {doctor.sessionPrice}</DoctorPrice>
                    </CardContent>
                  </DoctorItem>
                </Grid>
              ))
            )
          ) : (
            'Loading ....'
          )}
        </Grid>
        <p style={{color: 'red'}}>{error}</p>
      </Box>
  );
};

export default ViewDoctors;
