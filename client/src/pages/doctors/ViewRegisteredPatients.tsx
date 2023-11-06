import { Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../../configuration";
import axios from "axios";

const PatientItem = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
    cursor: 'pointer',
}) as typeof Card;

const PatientImage = styled(CardMedia)({
    width: 120,
    height: 120,
    borderRadius: '50%',
}) as typeof CardMedia;

const PatientInfo = styled(Typography)({
    fontWeight: 'bold',
    textAlign: 'center',
}) as typeof Typography;


interface PatientInfo {
    id: string;
    name: string;
    gender: string;
    imageUrl: string;
}

const ViewRegisteredPatients = () => {
    const [filteredPatients, setFilteredPatients] = useState<PatientInfo[] | undefined>();

    const [patientName, setPatientName] = useState('');
    const [error, setError] = useState('');

    const handleChangePatientName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPatientName(event.target.value);
    }

    const getAllPatients = async () => {
        try {
            const response = await axios.get(`${config.serverUri}/doctors/patients`);
            setFilteredPatients(response.data);
        } catch(error: any) {
            setError(error.message);
            console.log(error);
        }
    }

    useEffect(() => {
        getAllPatients();
    },[]);

    const handleFilterChange = async() => {
        try {
            setFilteredPatients(undefined);
            const response = await axios.get(`${config.serverUri}/doctors/patients`, {
              params: {
                patientName,
              }
            });
            setFilteredPatients(response.data);
          } catch (error: any) {
            setError(error.message);
            console.error(error);
          }
    }
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>
              View My Patients
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
              <TextField label="Patient Name" value={patientName} name='name' onChange={handleChangePatientName} sx={{ marginRight: 2 }} />
              <Button variant="contained" color="primary" onClick={handleFilterChange} sx={{marginLeft: '30px'}}>
                Search
              </Button>
            </Box>
    
            <Grid container spacing={2}>
                {
                filteredPatients ? (
                    filteredPatients.length === 0 ? (
                    'No Patients Found'
                    ) : 
                    (
                    filteredPatients.map((patient) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={patient.id}>
                            <PatientItem component={Link} to={`/doctor/patient/${patient.id}`}>
                                <PatientImage image={patient.imageUrl || ""} />
                                <CardContent>
                                    <PatientInfo variant="subtitle1">Name: {patient.name}</PatientInfo>
                                    <PatientInfo variant="subtitle2">Gender: {patient.gender}</PatientInfo>
                                </CardContent>
                            </PatientItem>
                        </Grid>
                    ))
                    )
                ) : 
                (
                    'Loading ....'
                )
                }
            </Grid>
            <p style={{color: 'red'}}>{error}</p>
        </Box>
    );
}

export default ViewRegisteredPatients;