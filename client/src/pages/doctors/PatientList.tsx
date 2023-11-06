import useGetAllPatients from "../../hooks/useGetAllPatients";
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import '@fontsource/roboto';
import { Typography } from '@mui/material';

    export default function PatientList() {
        const [searchTerm, setSearchTerm] = useState('');
        const patientList = useGetAllPatients().data;

        const filteredPatients = patientList?.filter((patient) => {
            const searchRegex = new RegExp(searchTerm, 'i');
            return (
                searchRegex.test(patient.username) ||
                searchRegex.test(patient.name) ||
                searchRegex.test(patient.email)
            );
        });

        const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
        };

        return (
            <>
                {filteredPatients && (
                    <TableContainer component={Paper} sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
                            Patients
                        </Typography>
                        <TextField
                            style={{ width: '50%' }}
                            label="Search by username, name, or email"
                            variant="outlined"
                            onChange={handleSearch}
                            sx={{ marginBottom: '1rem', textAlign: 'center' }}
                        />
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Username</TableCell>
                                    <TableCell align="center">Email </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{ textAlign: 'center' }}>
                                {filteredPatients.map((patient) => (
                                    <TableRow
                                        key={patient.username}
                                        sx={{ '&:hover': { backgroundColor: 'lightgray', cursor: 'pointer' } }}
                                        onClick={() => {
                                            window.location.href = `/patient/${patient._id}/info`;
                                        }}
                                    >
                                        <TableCell align="center">{patient.username}</TableCell>
                                        <TableCell align="center">{patient.name}</TableCell>
                                        <TableCell align="center">{patient.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </>
        );
    }
