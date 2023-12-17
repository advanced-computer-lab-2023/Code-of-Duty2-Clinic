// PatientInfoCard.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { config } from "../configuration";

interface PatientInfo {
  name: string | undefined;
  dateOfBirth: string | undefined;
  email: string | undefined;
  gender: string | undefined;
  mobileNumber: string | undefined;
}

const PatientInfoCard: React.FC = () => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get<any>(`${config.serverUri}/patients/patient-info-dash`);
        setPatientInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient information:", error);
        setLoading(false);
      }
    };

    fetchPatientInfo();
  }, []);

  return (
    <Card style={{width:'45%'}}>
    <CardContent>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width:'100%' }}>
          <CircularProgress />
        </div>
      ) : patientInfo ? (
        <div>
          <Typography variant="h6" fontWeight='bold'>
            Patient Information
          </Typography>
          <Typography variant="body1" fontSize='1.02rem'>
            <strong>Name:</strong> {patientInfo.name}
          </Typography>
          <Typography variant="body1"fontSize='1.02rem'>
            <strong>Email:</strong> {patientInfo.email}
          </Typography>
          <Typography variant="body1"fontSize='1.02rem'>
            <strong>Mobile Number:</strong> {patientInfo.mobileNumber}
          </Typography>
        </div>
      ) : (
        <Typography variant="body1">No patient information available.</Typography>
      )}
    </CardContent>
  </Card>
  
  );
};

export default PatientInfoCard;
