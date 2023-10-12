import { Component } from 'react';

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
interface AppointmentsListProps {
  appointments: Appointment[];
  onAppointmentClick?: (appointment: Appointment) => void;
}

class AppointmentsListDoctor extends Component<AppointmentsListProps> {
  render() {
    const { appointments, onAppointmentClick } = this.props;

    return (
      <div>
        <h2> List</h2>
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index} onClick={() => onAppointmentClick?.(appointment)}>
              <div className="appointment-item">
                <h3>{appointment.date}</h3>
                <p>Status: {appointment.status}</p>
                <p>Patient Information: </p>
                <p>Patient Name: {appointment.patientId.name}</p>
                <p>Patient dateOfBirth: {appointment.patientId.dateOfBirth}</p>
                <p>Patient gender: {appointment.patientId.gender}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AppointmentsListDoctor;
