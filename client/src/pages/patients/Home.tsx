import { useEffect } from "react";
import socket from "../../services/Socket";

export default function Home() {
  useEffect(() => {
    socket.on("message", (name) => {
      console.log("message", "message sent from doctor " + name);
    });
    socket.emit("message", {
      destinationId: "65561ebbec181d18d2476592",
      senderName: "Mahmoud",
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
}
