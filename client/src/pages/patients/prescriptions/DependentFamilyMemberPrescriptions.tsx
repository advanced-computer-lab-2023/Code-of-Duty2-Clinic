import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, InputLabel, TextField, Select, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useGetPatientDependentFamilyMemberPrescriptions from '../../../hooks/useGetPatientDependentFamilyMemberPrescriptions';
import { useLocation } from 'react-router-dom';

interface IMedicine {
    _id: string,
    name: string,
    dosage: string,
    image: string,
    price: number,
    quantity: number,
    createdAt: Date,
    updatedAt: Date,
    __v: number
}

interface IPrescription {
    _id: string
    patientName:string,
    doctorId:{
        _id:string
        name:string
    },
    status:string, 
    medicines: [IMedicine],
    createdAt:Date,
    updatedAt:Date
}

const PrescriptionList: React.FC = () => {
    const location = useLocation();
    const nationalId = location.state.nationalId;
    const { data: prescriptions, isLoading, isError } = useGetPatientDependentFamilyMemberPrescriptions(nationalId);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);
    const [filteredPrescriptions, setFilteredPrescriptions] = useState<IPrescription[]>([]);
    const navigate = useNavigate();
    const [doctorName, setDoctorName] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [search, setSearch] = useState({ doctorName: '', status: '', startDate: '', endDate: '' });

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        const form = event.currentTarget;
        const doctorName = form.doctorName.value;
        const status = form.status.value;
        const startDate = form.startDate.value;
        const endDate = form.endDate.value;

        setSearch({ doctorName, status, startDate, endDate });
        }
        
  
    useEffect(() => {
        const filtered = prescriptions?.filter((prescription: IPrescription) => {
          const doctorNameMatches = search.doctorName === '' || prescription.doctorId.name.includes(search.doctorName);
          const statusMatches = search.status === '' || prescription.status === search.status;
          const startDateMatches = search.startDate === '' || new Date(prescription.createdAt) >= new Date(search.startDate);
          const endDateMatches = search.endDate === '' || new Date(prescription.createdAt) <= new Date(search.endDate);
        
          return doctorNameMatches && statusMatches && startDateMatches && endDateMatches;
        });
      
        setFilteredPrescriptions(filtered || []);
      }, [search, prescriptions]);
      
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching prescriptions</div>;
    }

    const handleRowClick = (prescription: IPrescription) => {
        navigate('/patient/family-members/dependent/prescriptions/info', { state: { prescription: prescription } });
    };

    return (
        <>
        <Typography variant='h3' sx={{ textAlign: 'center', marginTop: '3rem', marginBottom: '3rem' }}> </Typography>
 <form noValidate autoComplete="off" onSubmit={handleSearch} >
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '40%', margin: '0 auto' }}>
      <TextField 
        name="doctorName" 
        label="Doctor Name" 
        variant="outlined" 
        value={doctorName} 
        onChange={(e) => setDoctorName(e.target.value)}
        sx={{ margin: 1 }}
      />
        <InputLabel htmlFor="status">Status</InputLabel>
        <Select 
        id="status"
        name="status" 
        value={status} 
        onChange={(e) => setStatus(e.target.value)}
        sx={{ margin: 1 }}
        >
              <MenuItem value="filled">Filled</MenuItem>
  <MenuItem value="unfilled">Unfilled</MenuItem>
        </Select>
      <InputLabel htmlFor="startDate">Start Date</InputLabel>
        <TextField 
        id="startDate"
        name="startDate" 
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)}
        sx={{ margin: 1 }}
        />
        <InputLabel htmlFor="endDate">End Date</InputLabel>
        <TextField 
        id="endDate"
        name="endDate" 
        type="date" 
        value={endDate} 
        onChange={(e) => setEndDate(e.target.value)}
        sx={{ margin: 1 }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 1 }}>
            <Button variant="contained" type="submit" sx={{ width: '20%', marginBottom: 1 }}>Search</Button>
            <Button 
            variant="contained" 
            sx={{ width: '20%' }} 
            onClick={() => {
                setDoctorName('');
                setStatus('');
                setStartDate('');
                setEndDate('');
                setSearch({ doctorName: '', status: '', startDate: '', endDate: '' });
            }}
            >
            Clear
            </Button>
        </Box>
    </Box>
  </form>
        <TableContainer component={Paper} sx={{width: '98%', margin: 'auto', marginTop: '5rem'}}>
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
                {filteredPrescriptions.map((prescription: IPrescription, index: number) => (
                        <TableRow 
                            key={index}
                            style={{ 
                                backgroundColor: hoveredRow === index ? 'lightgray' : 'white',
                                cursor: 'pointer'
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

export default PrescriptionList;

