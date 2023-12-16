import { useContext, useEffect } from "react";
import socket from "../../services/Socket";
import { UserContext } from "../../contexts/UserContext";
import UpcomingAppointmentsCard from "../../components/upcomingAppointmentsDash";
import AvailableAppointmentsToday from "../../components/viewAvaialbleTimeSlots";

const Home = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    socket.on("message", (name) => {
      console.log("message", "message sent from patient: " + name);
    });

    socket.emit("message", {
      destinationId: "653d9f8a0b1a1b9e68057a40",
      senderName: user!.name,
    });

    return () => {
      socket.off("message");
    };
  }, []);
  return (
    <>
      <div style={{ width: "40%", marginLeft: "10%" }}>
        <UpcomingAppointmentsCard isPatient={false} />
      </div>
      <div>
        <div style={{ marginLeft: "60%", width: "30%" }}>
          <AvailableAppointmentsToday />
        </div>
      </div>
    </>
  );
};

export default Home;
