import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { config } from "../../configuration";
import axios from "axios";
import PatientComponent from "../../features/patients/PatientComponent";
import IPatientInfo from "../../interfaces/PatientInfo";

const ViewDoctorPatients = () => {
  const [filteredPatients, setFilteredPatients] = useState<
    IPatientInfo[] | undefined
  >();

  const [patientName, setPatientName] = useState("");
  const [error, setError] = useState("");

  const handleChangePatientName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPatientName(event.target.value);
  };

  const getAllPatients = async () => {
    try {
      const response = await axios.get(`${config.serverUri}/doctors/patients`);
      setFilteredPatients(response.data);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  const handleFilterChange = async () => {
    try {
      setFilteredPatients(undefined);
      const response = await axios.get(`${config.serverUri}/doctors/patients`, {
        params: {
          patientName,
        },
      });
      setFilteredPatients(response.data);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
        View My Patients
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <TextField
          label="Patient Name"
          value={patientName}
          name="name"
          onChange={handleChangePatientName}
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterChange}
          sx={{ marginLeft: "30px" }}
        >
          Search
        </Button>
      </Box>

      <Grid container spacing={2}>
        {filteredPatients
          ? filteredPatients.length === 0
            ? "No Patients Found"
            : filteredPatients.map((patientData) => {
                const patient = {
                  id: patientData.id,
                  name: patientData.name,
                  email: patientData.email,
                  role: "PATIENT" as "PATIENT",
                  photoUrl: patientData.imageUrl,
                };
                return <PatientComponent patient={patient} />;
              })
          : "Loading ...."}
      </Grid>
      <p style={{ color: "red" }}>{error}</p>
    </Box>
  );
};

export default ViewDoctorPatients;
