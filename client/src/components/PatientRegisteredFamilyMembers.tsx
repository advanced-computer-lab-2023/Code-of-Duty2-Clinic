import { useState, useEffect } from "react";
import CardGrid from "./CardGrid";
import useGetPatientRegisteredFamilyMembers from "../hooks/useGetPatientRegisteredFamilyMembers";

export default function PatientRegisteredFamilyMembers() {
const patients = useGetPatientRegisteredFamilyMembers();

    return (
        <>
            <CardGrid
                title="Registered Family Members"
                primary="name"
                secondary="relation"
                list={patients}
                buttonText="View"
            />
        </>
    );
}
