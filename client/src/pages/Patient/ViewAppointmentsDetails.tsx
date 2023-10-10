import React, { Component, useState, useEffect } from 'react';
import FilterBar from '../../components/FilterBar';
import AppointmentsListPatient from '../../components/AppointmentsListPatient';
import Axios from 'axios';


interface Appointment {
  _id: string;
  date: string;
  status: string;
  doctorId: {
    _id: string;
    name: string;
  };
  patientId: {
    _id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
  };
}


const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const getAppointments = async()=>{
    // Fetch the initial list of patients from the API
    await Axios.get(`http://localhost:4000/api/appointments?doctorId=6522828264a0d02e49b570b2`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }
   useEffect( ()=> {
    getAppointments();
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

    setFilteredAppointments(filteredAppointments);
  };

  return (
    <div>
      <h1>Appointments</h1>
      <FilterBar onFilterChange={handleFilterChange} />
      <AppointmentsListPatient
        appointments={filteredAppointments}
      />
    </div>
  );
};

export default AppointmentsPage;
