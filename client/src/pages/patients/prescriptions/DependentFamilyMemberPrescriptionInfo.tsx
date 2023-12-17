import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Box, Paper } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {Info, Vaccines } from '@mui/icons-material';
interface IMedicine {
  medicineId: {
    _id: string;
    name: string;
    price: number;
    activeIngredients: string[];
    pictureUrl: string;
    availableQuantity: number;
    usages: string[];
    createdAt: Date;
    updatedAt: Date;
    description: string;
    dosage: string;
    };
  }


const PrescriptionInfo: React.FC = () => {
    const location = useLocation();
    const prescription = location.state.prescription;
    console.log(prescription);
    const navigate = useNavigate();

    const handleClick = (medicine: IMedicine) => {
      navigate('/patient/prescriptions/info/medicine', { state: { medicine: medicine } });
    }

    const handleBack = () => {
      navigate(-1);
    }

  return (
    <Paper elevation={2} style={{ padding: "1rem" }}>
      <div style={{padding: "1rem"}}>
    <Typography
      variant="h6"
      style={{ fontSize: "2rem", marginBottom: "1rem" }}
    >
      <Info fontSize="medium" /> Prescription Information
    </Typography>

    <Typography variant="h6" style={{ fontSize: "1.5rem" }}>
      <b>Doctor Name:</b> {prescription.doctorId.name}
    </Typography>
    <Typography variant="h6" style={{ fontSize: "1.5rem" }}>
      <b>Status:</b> {prescription.status}
    </Typography>

    <Typography variant="h6" style={{ fontSize: "1.5rem" }}>
      <b>Created At:</b> {new Date(prescription.createdAt).toLocaleDateString('us-US')}
    </Typography>

    <Typography variant="h6" style={{ fontSize: "1.5rem" }}>
      <b>Last Updated At: </b> {new Date(prescription.updatedAt).toLocaleDateString('us-US')}
    </Typography> 
    </div>

    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', marginTop: '2rem', alignItems: 'center'}}>
            <Typography variant="h2" component="div" style={{ fontSize: "2rem", marginBottom: "1rem"}}>
    <Vaccines fontSize='large'> </Vaccines><b>Medicines</b>
      </Typography>
    <Grid container spacing={1} sx={{margin: "2rem"}}>
      {prescription.medicines.map((medicine: IMedicine, index: React.Key | null | undefined) => (
        <Grid item xs={8} sm={3} md={2} key={index}>
          <Card sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  {medicine.medicineId.name}
                </Typography>
                <CardMedia
                  component="img"
                  height="20"
                  image={medicine.medicineId.pictureUrl}
                  sx={{ width: '50%', height: '80%', objectFit: 'contain' }}
                  alt="failed to load image"
                />
              </CardContent>
              <Button variant="contained" color="primary" sx={{ mt: 'auto' }} onClick={() => handleClick(medicine)}>
                View More Info
              </Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
    </Box>

    <Button variant="contained" onClick={handleBack} sx={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '2rem' }}>
  Back to my prescriptions
</Button>

    </Paper>
  );
};

export default PrescriptionInfo;
