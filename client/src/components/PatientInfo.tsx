import { Paper} from '@mui/material';
import '../css/PatientInfo.css';
import axios from 'axios';
import { useEffect, useState} from 'react';
import { useLocation} from 'react-router-dom';
import { Patient } from '../types';
import { config } from '../utils/config';


export default function PatientInfo() {
    const patientId = useLocation().pathname.split('/')[2];
    const [patient, setPatient] = useState<Patient>();

    useEffect(() => {
        const fetchPatient = async () => {
             await axios.get(`${config.serverUri}/patients/patient-info/${patientId}`)
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

