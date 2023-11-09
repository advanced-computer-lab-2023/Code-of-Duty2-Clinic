import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../../configuration";
import CardGrid from "../../components/CardGrid";
import { Box } from "@mui/material";

export default function PatientRegisteredFamilyMembers() {

    const [patientFamilyMembers, setPatientFamilyMembers] = useState([]);

    

    useEffect(() => {
        const fetchFamilyMembers = async () => {
              await axios.get(`${config.serverUri}/patients/family-members`)
            .then (response => {
               setPatientFamilyMembers(response.data.members);
            })
        };
        fetchFamilyMembers();
    }, []);

    return (
        <Box sx={{margin: '1vw'}}>
            <CardGrid
                title="Registered Family Members"
                list={patientFamilyMembers}
                primaryAttribute="name"
                secondaryAttribute="relation"
                showButton={false}
                buttonText="View"
            />
        </Box>
    );
}

 