import { User } from "../types/User";
import SocketType from "../types/SocketType";
import {
  rescheduleAppointmentForRegisteredPatientHandler,
  rescheduleAppointmentForDependentPatientHandler,
  cancelAppointmentForDependentPatientHandler,
  cancelAppointmentForRegisteredPatientHandler,
} from "../controllers/appointments/doctors";

const addSocketEventListeners = (socket: SocketType) => {
  const user = socket.handshake.auth as User;

  socket.on("appointment_rescheduling_as_doctor_for_registered", (data) =>
    rescheduleAppointmentForRegisteredPatientHandler(data, user.id, socket)
  );

  socket.on("appointment_rescheduling_as_doctor_for_dependent", (data) =>
    rescheduleAppointmentForDependentPatientHandler(data, user.id, socket)
  );

  socket.on("appointment_rescheduling_as_patient_for_registered", (data) =>
    rescheduleAppointmentForRegisteredPatientHandler(data, user.id, socket)
  );

  socket.on("appointment_rescheduling_as_patient_for_dependent", (data) =>
    rescheduleAppointmentForDependentPatientHandler(data, user.id, socket)
  );

  socket.on("appointment_cancellation_as_doctor_for_registered", (data) =>
    cancelAppointmentForRegisteredPatientHandler(data, user.id, socket)
  );

  socket.on("appointment_cancellation_as_doctor_for_dependent", (data) =>
    cancelAppointmentForDependentPatientHandler(data, user.id, socket)
  );

  socket.on("appointment_cancellation_as_patient_for_registered", (data) =>
    cancelAppointmentForRegisteredPatientHandler(data, user.id, socket)
  );

  socket.on("appointment_cancellation_as_patient_for_dependent", (data) =>
    cancelAppointmentForDependentPatientHandler(data, user.id, socket)
  );
};

export default addSocketEventListeners;
