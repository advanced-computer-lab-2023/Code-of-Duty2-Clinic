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
import interactionPlugin from "@fullcalendar/interaction";
import { config } from "../../configuration";
import axios from "axios";
import { useQuery } from "react-query";
import { Appointment } from "../../types";

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
      clickInfo.event.remove();
    }
  };

  const currentEvents: EventInput[] = getAllAppointmentsQuery.data?.map(
    (appointment: Appointment) => {
      return {
        id: appointment.appointmentId,
        start: new Date(appointment.timePeriod.startTime).toISOString(),
        end: new Date(appointment.timePeriod.endTime).toISOString(),
        title: `Meeting with ${appointment.user.name}`,
        backgroundColor: "red",
      };
    }
  );
  console.log("Rendering ...");

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
          allDayContent={() => "all-day"}
          businessHours={{
            daysOfWeek: [0, 1, 2, 3, 4],
            startTime: "10:00",
            endTime: "18:00",
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
