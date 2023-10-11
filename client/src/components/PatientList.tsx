import CardGrid from "./CardGrid";
import { useEffect, useState } from "react";
import axios from "axios";
import '@fontsource/roboto';

export default function PatientList() {

    


    const [patientList, setPatient] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            //  await axios.get(`${import.meta.env.VITE_SERVER_URI}/patients/${patientId}`)
            await axios.get('http://localhost:3000/api/patients')
            .then (response => {
               setPatient(response.data);
            })
        };
        fetchPatients();
    }, []);

    return (
        <>
           <CardGrid primary="name" secondary="dateOfBirth" buttonText="View" list={patientList} title="Patient List"/>
        </>
    );
    }