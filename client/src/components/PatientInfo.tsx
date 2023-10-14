import { Paper} from '@mui/material';
import '../css/PatientInfo.css';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useLocation} from 'react-router-dom';
import { Patient } from '../types';


export default function PatientInfo() {
    const patientId = useLocation().pathname.split('/')[2];
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        console.log(patientId);
        console.log(import.meta.env.VITE_SERVER_URI)
        const fetchPatient = async () => {
             await axios.get(`${import.meta.env.VITE_SERVER_URI}/patients/patient-info/${patientId}`)
            // await axios.get(`http://localhost:3000/api/patients/patient-info/${patientId}`)
            .then (response => {
               setPatient(response.data);
            })
        };
        fetchPatient();
    }, []);

    return (
        <div className="patientInfo">
            <h1 className="patientInfoPageTitle">Patient Info</h1>
                <PatientInfoCard
                    name={patient?.name ?? ''}
                    dob={patient?.dateOfBirth.toString() ?? ''}
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

