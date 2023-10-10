import Axios from "axios";
import Axios from "axios";
import Axios from "axios";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import FilterBar from "../../components/FilterBar";
import FilterBar from "../../components/FilterBar";
import FilterBar from "../../components/FilterBar";
import FilterBar from "../../components/FilterBar";
import PatientList from "../../components/PatientList";
import PatientList from "../../components/PatientList";
import PatientList from "../../components/PatientList";
import PatientList from "../../components/PatientList";
import { Appointment } from '../pages/Doctor/ViewPatients';

import { useState, useEffect } from "react";


export const AppointmentsPage: React.FC = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [filteredPatients, setFilteredPatients] = useState<Appointment[]>([]);
    const testFn = () => {
    };
    useEffect(() => {
        // Fetch the initial list of patients from the API
        Axios.get('http://localhost:4000/api/appointments?doctorId=6522828264a0d02e49b570b2')
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
                    appointment.date.substring(0, 10) === selectedDate)
            );
        });

        setFilteredPatients(filteredAppointments);
    };

    return (
        <div>
            <h1>Appointments</h1>
            <FilterBar onFilterChange={handleFilterChange} />
            <PatientList
                patients={filteredPatients.map((appointment) => appointment.patientId)}
                onPatientClick testFn />
        </div>
    );
};
