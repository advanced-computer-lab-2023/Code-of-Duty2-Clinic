import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  EventRemoveArg,
  EventInput,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { EventDragStopArg } from "@fullcalendar/interaction";
import { config } from "../../configuration";
import axios from "axios";
import { useQuery } from "react-query";
import { Appointment } from "../../types";
import socket from "../../services/Socket";

const getAllAppointments = async () => {
  const response = await axios.get(`${config.serverUri}/doctors/appointments`);
  return response.data;
};

const DoctorSchedule = () => {
  const getAllAppointmentsQuery = useQuery(
    ["getAllAppointments"],
    getAllAppointments
  );

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    if (selectInfo.start < new Date()) {
      return;
    }
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: "1",
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      socket.emit("");
    }
  };

  const currentEvents: EventInput[] = getAllAppointmentsQuery.data?.map(
    (appointment: Appointment) => {
      return {
        id: appointment.appointmentId,
        start: new Date(appointment.timePeriod.startTime).toISOString(),
        end: new Date(appointment.timePeriod.endTime).toISOString(),
        title: appointment.user.name,
        backgroundColor: "#378006",
        borderColor: "#378006",
        rendering: "background",
      };
    }
  );

  return (
    <div className="demo-app">
      <div className="demo-app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          initialView="dayGridMonth"
          validRange={{ start: new Date() }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          events={currentEvents}
          eventAdd={function ({ event }) {
            // console.log(event.toJSON());
            event.setProp("backgroundColor", "red");
            console.log("eventAdd");
          }}
          eventChange={function () {
            console.log("eventChange");
          }}
          eventRemove={function (args: EventRemoveArg) {
            console.log("eventRemove");
          }}
          eventDragStop={function (args: EventDragStopArg) {
            console.log("old start: " + args.event.start?.toISOString());
            console.log("old end: " + args.event.end?.toISOString());
            console.log("eventDragStop");
          }}
          eventDrop={function (args: EventDragStopArg) {
            console.log("new start: " + args.event.start?.toISOString());
            console.log("new end: " + args.event.end?.toISOString());
          }}
          allDayContent={() => "all-day"}
          businessHours={{
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "10:00",
            endTime: "18:00",
          }}
          selectAllow={(selectInfo) => {
            const start = new Date(selectInfo.startStr);
            const end = new Date(selectInfo.endStr);
            const isDuringBusySlot = currentEvents.some((event) => {
              return (
                event.rendering === "background" &&
                start >= event.start! &&
                end <= event.end!
              );
            });
            return !isDuringBusySlot; // If the selection is during a busy slot, disallow it
          }}
        />
      </div>
    </div>
  );
};

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
}

export default DoctorSchedule;
