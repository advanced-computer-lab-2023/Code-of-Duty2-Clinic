import { useEffect } from "react";
import socket from "../../services/Socket";

const Home = () => {
  useEffect(() => {
    socket.on("message", (name) => {
      console.log("message", "message sent from patient: " + name);
    });

    socket.emit("message", {
      destinationId: "653d9f8a0b1a1b9e68057a40",
      senderName: "John Doe",
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
