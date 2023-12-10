import { useContext, useEffect } from "react";
import socket from "../../services/Socket";
import { UserContext } from "../../contexts/UserContext";

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
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
