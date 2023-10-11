import Axios from "axios";

import FilterBar from "../components/FilterBar";

import PatientList from "../components/AppointmentsListPatient";


import { useState, useEffect } from "react";
import { Appointment } from "../types";


export const AppointmentsPage: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<Appointment[]>([]);
    const testFn = () => {
    };
    useEffect(() => {
        // Fetch the initial list of patients from the API
        Axios.get(`${}/appointments?doctorId=6522828264a0d02e49b570b2`)
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching patients:', error);
            });
    }, []);

    const handleFilterChange = (selectedDate: string, selectedStatus: string) => {
        // Filter the appointments based on selected status and date
        const filteredAppointments = appointments.filter((appointment) => {
            return (
                (selectedStatus === 'All' || appointment.status === selectedStatus) &&
                (selectedDate === '' ||
                    appointment.date.toDateString.substring(0, 10) === selectedDate)
            );
        });

        setFilteredPatients(filteredAppointments);
    };

    return (
        <div>
            <h1>Appointments</h1>
            <FilterBar onFilterChange={handleFilterChange} />
            <PatientList
                appointments={filteredPatients.map((appointment) => appointment.patientId)}
                onPatientClick testFn />
        </div>
    );
};
