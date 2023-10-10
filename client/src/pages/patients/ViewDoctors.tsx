import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Card, CardMedia, CardContent, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Doctor } from '../../types';
import { Link } from 'react-router-dom';

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
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [name, setName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [availability, setAvailability] = useState('');

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFilteredDoctors = async () => {
    try {
      const response = await axios.get('/api/doctors', {
        params: {
          name,
          speciality,
          availability,
        },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSpecialityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeciality(event.target.value);
  };

  const handleAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvailability(event.target.value);
  };

  const handleSearchClick = () => {
    fetchFilteredDoctors();
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
        View Doctors
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
        <TextField label="Name" value={name} onChange={handleNameChange} sx={{ marginRight: 2 }} />
        <TextField label="Speciality" value={speciality} onChange={handleSpecialityChange} sx={{ marginRight: 2 }} />
        <TextField label="Availability" value={availability} onChange={handleAvailabilityChange} sx={{ marginRight: 2 }} />
        <Button variant="contained" color="primary" onClick={handleSearchClick}>
          Search
        </Button>
      </Box>
      <Grid container spacing={2}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={doctor._id}>
            <DoctorItem component={Link} to={`${import.meta.env.VITE_SERVER_URI}/doctors/${doctor._id}`}>
              <DoctorImage image={doctor.image} />
              <CardContent>
                <DoctorInfo variant="subtitle1">{doctor.name}</DoctorInfo>
                <DoctorInfo variant="subtitle2">{doctor.speciality}</DoctorInfo>
                <DoctorPrice variant="body1">{doctor.price}</DoctorPrice>
              </CardContent>
            </DoctorItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewDoctors;
