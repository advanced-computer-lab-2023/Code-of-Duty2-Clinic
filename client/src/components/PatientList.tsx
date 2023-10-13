import CardGrid from "./CardGrid";
import { useEffect, useState } from "react";
import axios from "axios";
import '@fontsource/roboto';
import { config } from "../utils/config";

export default function PatientList() {

    const [patientList, setPatient] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            await axios.get(`${config.serverUri}/api/patients`)
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