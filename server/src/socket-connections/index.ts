import { User } from "../types/User";
import SocketType from "../types/SocketType";
import {
  rescheduleAppointmentForRegisteredPatientHandler,
  rescheduleAppointmentForDependentPatientHandler,
  cancelAppointmentForDependentPatientHandler,
  cancelAppointmentForRegisteredPatientHandler,
} from "../controllers/appointments/doctors";

const addSocketEventListeners = (socket: SocketType) => {
  const userId = socket.handshake.auth.userId;

  socket.on("appointment_rescheduling_as_doctor_for_registered", (data) =>
    rescheduleAppointmentForRegisteredPatientHandler(data, userId, socket)
  );

  socket.on("appointment_rescheduling_as_doctor_for_dependent", (data) =>
    rescheduleAppointmentForDependentPatientHandler(data, userId, socket)
  );

  socket.on("appointment_rescheduling_as_patient_for_registered", (data) =>
    rescheduleAppointmentForRegisteredPatientHandler(data, userId, socket)
  );

  socket.on("appointment_rescheduling_as_patient_for_dependent", (data) =>
    rescheduleAppointmentForDependentPatientHandler(data, userId, socket)
  );

  socket.on("appointment_cancellation_as_doctor_for_registered", (data) =>
    cancelAppointmentForRegisteredPatientHandler(data, userId, socket)
  );

  socket.on("appointment_cancellation_as_doctor_for_dependent", (data) =>
    cancelAppointmentForDependentPatientHandler(data, userId, socket)
  );

  socket.on("appointment_cancellation_as_patient_for_registered", (data) =>
    cancelAppointmentForRegisteredPatientHandler(data, userId, socket)
  );

  socket.on("appointment_cancellation_as_patient_for_dependent", (data) =>
    cancelAppointmentForDependentPatientHandler(data, userId, socket)
  );
};

export default addSocketEventListeners;
