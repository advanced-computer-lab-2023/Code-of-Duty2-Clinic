import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type SocketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

export default SocketType;
