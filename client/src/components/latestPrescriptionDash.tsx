import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import axios, { AxiosResponse } from "axios";
import { config } from "../configuration";

interface IMedicine {
  medicineId: {
    _id: string;
    name: string;
    price: number;
  };
  dosage: string;
}

interface IPrescription {
  _id: string;
  patientName: string;
  doctorId: {
    _id: string;
    name: string;
  };
  status: string;
  medicines: [IMedicine];
  updatedAt: Date;
}

const LatestPrescriptionCard: React.FC = () => {
  const [latestPrescription, setLatestPrescription] =
    useState<IPrescription | null>(null);

  useEffect(() => {
    const fetchLatestPrescription = async () => {
      try {
        const response: AxiosResponse = await axios.get(
          `${config.serverUri}/patients/prescriptions`
        );
        const latestPrescriptionData: IPrescription | undefined =
          response.data[0];
        setLatestPrescription(latestPrescriptionData || null);
      } catch (error) {
        console.error("Error fetching latest prescription:", error);
      }
    };

    fetchLatestPrescription();
  }, []);

  if (!latestPrescription) {
    return <div>Loading...</div>; // You can customize the loading state
  }

  const printDate = (date: string): string => {
    const dateObj: Date = new Date(date);
    return `${dateObj.getDate()} - ${
      dateObj.getMonth() + 1
    } - ${dateObj.getFullYear()}`;
  };

  return (
    <div>
    <Card style={{ width: '45%', border: '1px solid #ccc', borderRadius: '5px' }}>
      <CardContent>
        <Typography variant="h5" component="div" fontWeight='bold' style={{ marginBottom: '10px' }}>
          Latest Prescription
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize='1.02rem' style={{ marginBottom: '5px' }}>
          Doctor Name: <span style={{ color: '#000' }}>{latestPrescription.doctorId.name}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize='1.02rem' style={{ marginBottom: '5px' }}>
          Status: <span style={{ color: '#000' }}>{latestPrescription.status}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize='1.02rem' style={{ marginBottom: '5px' }}>
          Date: <span style={{ color: '#000' }}>{printDate(latestPrescription.updatedAt.toString())}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize='1.02rem' style={{ marginBottom: '10px' }}>
          Medicines:
        </Typography>
        <List>
          {latestPrescription.medicines.map((medicine: IMedicine, index: number) => (
            <ListItem
              key={index}
              style={{
                marginBottom: '10px',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <Typography variant="h6" color="text.primary">
                {medicine.medicineId.name}
              </Typography>
              <div style={{ marginLeft: '20px' }}>
                <Typography variant="body2" color="text.secondary">
                  Dosage: <span style={{ color: '#000' }}>{medicine.dosage}</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: <span style={{ color: '#000' }}>${medicine.medicineId.price}</span>
                </Typography>
              </div>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  </div>
  );
};

export default LatestPrescriptionCard;
