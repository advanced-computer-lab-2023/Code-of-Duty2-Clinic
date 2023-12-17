// RegisteredPrescriptionsComponent.tsx

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../../configuration';

interface IMedicine {
  _id: string;
  name: string;
  dosage: string;
  image: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface IPrescription {
  _id: string;
  doctorId: {
    _id: string;
    name: string;
  };
  status: string;
  medicines: IMedicine[];
  createdAt: Date;
  updatedAt: Date;
}


const RegisteredPrescriptionsComponent: React.FC = () => {
  const navigate = useNavigate();
  const { memberId } = useParams(); // Access route parameters using useParams
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`${config.serverUri}/patients/family-members/registered/prescriptions/${memberId}`);
        const fetchedPrescriptions: IPrescription[] = response.data;
        setPrescriptions(fetchedPrescriptions);
      } catch (error) {
        console.error('Error fetching registered family member prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, [memberId]); // Add familyMemberId to the dependency array

  const handleRowClick = (prescription: IPrescription) => {
    navigate('/patient/registered-prescriptions/info', { state: { prescription } });
  };

  return (
    <>
      <Typography variant="h3" sx={{ textAlign: 'center', marginTop: '3rem', marginBottom: '3rem' }}>
        Registered Prescriptions
      </Typography>
      <TableContainer component={Paper} sx={{ width: '98%', margin: 'auto', marginTop: '5rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Doctor's Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Number of Medicines</TableCell>
              <TableCell>Created On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptions.map((prescription: IPrescription, index: number) => (
              <TableRow
                key={index}
                style={{
                  backgroundColor: hoveredRow === index ? 'lightgray' : 'white',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => handleRowClick(prescription)}
              >
                <TableCell>{prescription.doctorId?.name}</TableCell>
                <TableCell>{prescription.status}</TableCell>
                <TableCell>{prescription.medicines.length}</TableCell>
                <TableCell>{new Date(prescription.createdAt).toLocaleDateString('us-US')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RegisteredPrescriptionsComponent;
