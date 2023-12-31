import SocketType from "../types/SocketType";
import {
  rescheduleAppointmentForPatientHandler,
  cancelAppointmentForPatientHandler
} from "../controllers/appointments/doctors";
import {
  cancelAppointmentForDependentPatientHandler,
  cancelAppointmentForRegisteredPatientHandler,
  rescheduleAppointmentForDependentPatientHandler,
  rescheduleAppointmentForRegisteredPatientHandler
} from "../controllers/appointments/patients";

const userIdToSocketIdMap: Map<string, string> = new Map();

export const getSocketIdForUserId = (userId: string) => {
  return userIdToSocketIdMap.get(userId)!;
};

const socketEventListeners = (socket: SocketType) => {
  const userId = socket.handshake.auth.userId;
  if (!userId) {
    return;
  }
  userIdToSocketIdMap.set(userId, socket.id);

  socket.on("connect", () => {
    userIdToSocketIdMap.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    userIdToSocketIdMap.delete(userId);
  });

  socket.on("error", (err) => {
    console.log(`Error occurred on socket ${socket.id}: ${err}`);
  });

  socket.on("message", ({ destinationId, senderName }) => {
    socket.emit("message", "Hello from server");
  });

  socket.on("appointment_rescheduling_as_doctor", (data) =>
    rescheduleAppointmentForPatientHandler(data, socket)
  );

  socket.on("appointment_rescheduling_as_patient_for_registered", (data) =>
    rescheduleAppointmentForRegisteredPatientHandler(data, socket)
  );

  socket.on("appointment_rescheduling_as_patient_for_dependent", (data) =>
    rescheduleAppointmentForDependentPatientHandler(data, socket)
  );

  socket.on("appointment_cancellation_as_doctor", (data) =>
    cancelAppointmentForPatientHandler(data, socket)
  );

  socket.on("appointment_cancellation_as_patient_for_registered", (data) =>
    cancelAppointmentForRegisteredPatientHandler(data, socket)
  );

  socket.on("appointment_cancellation_as_patient_for_dependent", (data) =>
    cancelAppointmentForDependentPatientHandler(data, socket)
  );
};

export default socketEventListeners;
