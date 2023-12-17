import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Button, Divider } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import useGetAdminUsersByType from '../../hooks/useGetAdminUsersByType';
import axios from 'axios';
import { config } from '../../configuration';


const Home: React.FC = () => {

    const navigate = useNavigate();

    const adminUsername = useGetAdminUsersByType('admin').data?.[0].username;

    const patients = useGetAdminUsersByType('patient');
    const doctors = useGetAdminUsersByType('doctor');
    const admins = useGetAdminUsersByType('admin');

    const totalPatients = patients.data?.length;
    const totalDoctors = doctors.data?.length;
    const totalAdmins = admins.data?.length;

    const totalUsers = totalPatients + totalDoctors + totalAdmins;

    return (
    <Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="h3" sx={{ marginBottom: '10vh' }}>
                        Welcome, {adminUsername}
                    </Typography>
                    <Typography variant="h4" sx={{ marginBottom: '2vh' }}>
                        There are currently {totalUsers} registered users
                    </Typography>
                </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Grid container spacing={2} justifyContent={'center'}>
            <UserCountInfoCard title="Patients" count={totalPatients} onClick={ () => {
                navigate('/admin/users/patients');
            }} />
            <UserCountInfoCard title="Doctors" count={totalDoctors} onClick={ () => {
                navigate('/admin/users/doctors');
            }}/>
            <UserCountInfoCard title="Admins" count={totalAdmins} onClick={ () => {
                navigate('/admin/users/admins');
            }}/>
            </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right' }}>
            <PieChart
                series={[
                    {
                        data: [
                            { id: "patientsPieChart", value: totalPatients, label: `Patients` },
                            { id: "doctorsPieChart", value: totalDoctors, label: `Doctors` },
                            { id: "adminsPieChart", value: totalAdmins, label: `Admins` },
                        ],
                    },
                ]}
                width={500}
                height={250}
            />
        </Box>
        <Divider sx={{ marginTop: '5vh', marginBottom: '5vh' }} />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography variant="h4" sx={{ marginBottom: '2vh' }}>
                        System Information
                    </Typography>
                </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <UserCountInfoCard title="Doctor Registration Requests" count={totalPatients} onClick={ () => {
                navigate('/admin/doctor-requests');
            }} />
                <UserCountInfoCard title="Health Packages" count={totalPatients} onClick={ () => {
                navigate('/admin/healthPackages');
            }}/>
                </Box>
</Box>
    );
};

interface UserCountInfoCardProps {
    title: string;
    count: number;
    onClick?: () => void;
}

const UserCountInfoCard: React.FC<UserCountInfoCardProps> = ({ title, count, onClick}) => {
    return (
        <Card sx={{width: '15%', margin: '2%'}}>
            <Box sx={{textAlign: 'center'}}>
                <CardContent>
                    <Typography variant="h3" component="div">
                        {count}
                    </Typography>
                    <Typography variant="h5" component="div" sx={{marginBottom: '1vh'}}>
                        {title}
                    </Typography>
                    <Button variant="text" color="secondary" onClick={onClick}>
                        View All {title}
                    </Button>
                </CardContent>
            </Box>
        </Card>
    );
};
export const handleRemoveUser = async (username: string, type: string, navigate: ReturnType<typeof useNavigate>) => {
    const data = {
      username: username,
      type: type,
    };
    try {
        await axios.delete(`${config.serverUri}/admins/users`, {data})   
        navigate("/admin/users/remove/success");
        } catch (err) {
            console.log(err);
        }
    }

export default Home;
