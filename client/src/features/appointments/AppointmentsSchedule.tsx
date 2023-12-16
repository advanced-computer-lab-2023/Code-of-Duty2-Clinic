import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventInput,
  EventDropArg
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { config } from "../../configuration";
import axios from "axios";
import { Appointment } from "../../types";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { useEffect, useState } from "react";
import ModalOptions from "../../types/ModalOptions";
import { getFormattedDate, getFormattedTime } from "../../utils/formatter";
import socket from "../../services/Socket";
import { useQueryParams } from "../../hooks/useQueryParams";
import {
  AppointmentBookingOption,
  getNavigationLinkToPayment
} from "../../pages/patients/appointments/AppointmentBooking";
import { useNavigate } from "react-router-dom";

const getAllAppointments = async (doctorId?: string) => {
  if (doctorId) {
    const response = await axios.get(
      `${config.serverUri}/patients/doctors/${doctorId}/appointments`
    );
    return response.data;
  }
  const response = await axios.get(`${config.serverUri}/doctors/appointments`);
  return response.data;
};

const noOperationFunction = () => {};

const AppointmentsSchedule = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [handleModalConfirm, setHandleModalConfirm] = useState<() => void>(noOperationFunction);
  const [handleModalCancel, setHandleModalCancel] = useState<() => void>(handleHideModal);

  const [events, setEvents] = useState<EventInput[] | undefined>([]);

  const doctorId = useQueryParams().get("doctorId")!;
  const registeredPatientId = useQueryParams().get("regId");
  const dependentNationalId = useQueryParams().get("depId");
  const supervisingPatientId = useQueryParams().get("spId");
  const isFollowUpAppointment = useQueryParams().get("isFollowUp");

  const handleShowModal = (modalOptions: ModalOptions) => {
    setModalTitle(modalOptions.title);
    setModalDescription(modalOptions.description);
    setHandleModalConfirm(() => modalOptions.handleConfirm);
    setHandleModalCancel(() => modalOptions.handleCancel ?? handleHideModal);
    setModalOpen(true);
  };

  function handleHideModal() {
    setModalOpen(false);
  }

  const navigate = useNavigate();

  const handleAddingAppointment = (selectInfo: DateSelectArg) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    handleShowModal({
      title: getAddingNewItemTitle(),
      description: `Would you like to ${getAddingNewItemTitle()} on ${getFormattedDate(
        selectInfo.startStr
      )} from ${getFormattedTime(selectInfo.startStr)} to ${getFormattedTime(selectInfo.endStr)}?`,
      handleConfirm: () => {
        if (isAFollowUpAppointment()) {
          executeProperApiFollowUpAction(selectInfo.startStr, selectInfo.endStr);
        } else {
          if (isASelfPatientAction()) {
            navigate(
              getNavigationLinkToPayment({
                bookingOption: AppointmentBookingOption.SELF,
                doctorId,
                startTime: new Date(selectInfo.startStr),
                endTime: new Date(selectInfo.endStr)
              })
            );
          } else if (isARegisteredPatientAction()) {
            navigate(
              getNavigationLinkToPayment({
                bookingOption: AppointmentBookingOption.REGISTERED_FAMILY_MEMBER,
                doctorId,
                patientId: registeredPatientId!,
                startTime: new Date(selectInfo.startStr),
                endTime: new Date(selectInfo.endStr)
              })
            );
          } else if (isADependentPatientAction()) {
            navigate(
              getNavigationLinkToPayment({
                bookingOption: AppointmentBookingOption.DEPENDENT_FAMILY_MEMBER,
                doctorId,
                patientId: dependentNationalId!,
                startTime: new Date(selectInfo.startStr),
                endTime: new Date(selectInfo.endStr)
              })
            );
          }
        }
        if (isADoctorAction()) {
          calendarApi.addEvent({
            id: "1",
            title: "appointment",
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          });
        }
        handleHideModal();
      }
    });
  };

  async function executeProperApiFollowUpAction(startStr: string, endStr: string) {
    if (isASelfPatientAction()) {
      return await axios.post(`${config.serverUri}/patients/follow-up-requests-for-registered`, {
        doctorId,
        timePeriod: {
          startTime: new Date(startStr).toISOString(),
          endTime: new Date(endStr).toISOString()
        }
      });
    }

    if (isARegisteredPatientAction()) {
      return await axios.post(
        `${config.serverUri}/patients/follow-up-requests-for-registered?registeredPatientId${registeredPatientId}`,
        {
          doctorId,
          timePeriod: {
            startTime: new Date(startStr).toISOString(),
            endTime: new Date(endStr).toISOString()
          }
        }
      );
    }
    if (isADependentPatientAction()) {
      return await axios.post(`${config.serverUri}/patients/follow-up-requests-for-dependent`, {
        dependentNationalId,
        doctorId,
        timePeriod: {
          startTime: new Date(startStr).toISOString(),
          endTime: new Date(endStr).toISOString()
        }
      });
    }
  }

  function getAddingNewItemTitle() {
    if (isAFollowUpAppointment()) {
      if (isADoctorAction()) return "Schedule a follow up appointment";
      if (isADependentPatientAction())
        return "Request a follow up appointment for your dependent patient";
      if (isARegisteredPatientAction())
        return "Request a follow up appointment for your registered patient";
      return "Request a follow up appointment";
    }
    if (isADependentPatientAction()) return "Add a new appointment for your dependent patient";
    if (isARegisteredPatientAction()) return "Add a new appointment for your registered patient";
    return "Add a new appointment";
  }

  function isADoctorAction() {
    return !isADependentPatientAction() && !isARegisteredPatientAction && !doctorId;
  }
  function isASelfPatientAction() {
    return !isADependentPatientAction() && !isARegisteredPatientAction && !!doctorId;
  }
  function isAFollowUpAppointment() {
    return !!isFollowUpAppointment;
  }
  function isADependentPatientAction() {
    return !!dependentNationalId && !!supervisingPatientId;
  }
  function isARegisteredPatientAction() {
    return !!registeredPatientId;
  }

  const handleCancellingAppointment = (clickInfo: EventClickArg) => {
    handleShowModal({
      title: "Cancel Appointment",
      description: `Would you like to cancel this appointment on ${getFormattedDate(
        clickInfo.event.startStr
      )} from ${getFormattedTime(clickInfo.event.startStr)} to ${getFormattedTime(
        clickInfo.event.endStr
      )}?`,
      handleConfirm: () => {
        socket.emit("appointment_cancellation_as_doctor", {
          appointmentId: clickInfo.event.id,
          appointedPatientType: clickInfo.event.extendedProps.isForDependent
            ? "dependent"
            : "registered"
        });
        clickInfo.event.remove();
        handleHideModal();
      }
    });
  };

  const handleReschedulingAppointment = (dropInfo: EventDropArg) => {
    const calendarApi = dropInfo.view.calendar;
    const overlappingEvents = calendarApi
      .getEvents()
      .some(
        (event) =>
          event.id !== dropInfo.event.id &&
          areOverlapping(
            { start: event.start!, end: event.end! },
            { start: dropInfo.event.start!, end: dropInfo.event.end! }
          )
      );
    if (overlappingEvents) {
      dropInfo.revert();
      dropInfo.event;
      return;
    }

    handleShowModal({
      title: "Reschedule Appointment",
      description: `Would you like to reschedule this appointment on ${getFormattedDate(
        dropInfo.event.startStr
      )} from ${getFormattedTime(dropInfo.event.startStr)} to ${getFormattedTime(
        dropInfo.event.endStr
      )}?`,
      handleConfirm: () => {
        socket.emit("appointment_rescheduling_as_doctor", {
          appointmentId: dropInfo.oldEvent.id,
          timePeriod: {
            startTime: dropInfo.event.startStr,
            endTime: dropInfo.event.endStr
          },
          appointedPatientType: dropInfo.event.extendedProps.isForDependent
            ? "dependent"
            : "registered"
        });
        dropInfo.event.setStart(dropInfo.event.startStr);
        dropInfo.event.setEnd(dropInfo.event.endStr);
        handleHideModal();
      },
      handleCancel: () => {
        dropInfo.revert();
        handleHideModal();
      }
    });
  };

  useEffect(() => {
    getAllAppointments().then((appointments) => {
      setEvents(
        appointments.map((appointment: Appointment) => {
          return {
            id: appointment.appointmentId,
            start: new Date(appointment.timePeriod.startTime).toISOString(),
            end: new Date(appointment.timePeriod.endTime).toISOString(),
            isForDependent: appointment.isForDependent,
            title: appointment.user.name,
            backgroundColor: "#378006",
            borderColor: "#378006",
            rendering: "background"
          };
        })
      );
    });
  }, []);

  if (!events) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ConfirmationModal
        description={modalDescription}
        handleConfirm={handleModalConfirm}
        handleClose={handleModalCancel}
        open={isModalOpen}
        title={modalTitle}
      />
      <h5>{isADoctorAction() ? "" : "Choose a time slot"}</h5>

      <div style={{ padding: "2.5%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          initialView="dayGridMonth"
          validRange={{ start: new Date() }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleAddingAppointment}
          eventContent={renderEventContent} // custom render function
          eventClick={handleCancellingAppointment}
          events={events}
          eventDrop={handleReschedulingAppointment}
          allDayContent={() => "all-day"}
          businessHours={{
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "10:00",
            endTime: "18:00"
          }}
          selectAllow={(selectInfo) => {
            const start = selectInfo.start;
            const end = selectInfo.end;
            const isDuringBusySlot = events?.some((event) => {
              return (
                event.rendering === "background" &&
                areOverlapping(
                  { start, end },
                  {
                    start: new Date(event.start!.toLocaleString()),
                    end: new Date(event.end!.toLocaleString())
                  }
                )
              );
            });
            return !isDuringBusySlot; // If the selection is during a busy slot, disallow it
          }}
        />
      </div>
    </>
  );
  function renderEventContent(eventContent: EventContentArg) {
    if (isADoctorAction()) {
      return (
        <div style={{ backgroundColor: "green", color: "white", padding: "4%" }}>
          <b>{eventContent.timeText}</b>
          <i>{eventContent.event.title}</i>
        </div>
      );
    }
    return <div style={{ backgroundColor: "gray", padding: "4%" }}>Busy Slot</div>;
  }
};

type Period = {
  start: Date;
  end: Date;
};
function areOverlapping(period1: Period, period2: Period): boolean {
  return (
    (period1.start! < period2.end! && period1.start! > period2.start!) ||
    (period1.end! < period2.end! && period1.end! > period2.start!)
  );
}

export default AppointmentsSchedule;
