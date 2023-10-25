import { Paper} from '@mui/material';
import '../css/PatientInfo.css';
import { useLocation} from 'react-router-dom';
import useGetPatient from '../hooks/useGetPatient';


export default function PatientInfo() {
    const patientId = useLocation().pathname.split('/')[2];
    const { data: patient } = useGetPatient(patientId);

    if (!patient) return (<div>Loading...</div>);

    return (
        <div className="patientInfo">
            <h1 className="patientInfoPageTitle">Patient Info</h1>
            <PatientInfoCard
                name={patient?.name ?? ''}
                dob={patient?.dateOfBirth?.toString() ?? ''}
                email={patient?.email ?? ''}
                gender={patient?.gender ?? ''}
                mobile={patient?.mobileNumber ?? ''}
            />
        </div>
    );
}

function PatientInfoCard({
    name,
    dob,
    email,
    gender,
    mobile,
}: {
    name: string;
    dob: string;
    email: string;
    gender: string;
    mobile: string;
}) {
    return (
        <Paper elevation={2} className="patientInfoCard">
            <h1 className="patientInfoTitle"> Personal Information </h1>
            <h3>Name: {name}</h3>
            <h3>Date of Birth: {dob}</h3>
            <h3> Email: {email}</h3>
            <h3>Gender: {gender}</h3>
            <h3>Mobile Number: {mobile}</h3>
        </Paper>
    );
}

