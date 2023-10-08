import { useState, useEffect } from "react";
import CardGrid from "./CardGrid";

export default function PatientRegisteredFamilyMembers() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/patientList")
            .then((response) => response.json())
            .then((data) => setPatients(data));
    }, []);

    return (
        <>
            <CardGrid
                title="Registered Family Members"
                primary="name"
                secondary="relationship"
                list={patients}
                buttonText="View"
            />
        </>
    );
}
