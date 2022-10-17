import { io, Socket } from "socket.io-client";

const socket = io("http://localhost:3001");

export const onExternalEvent = <T>(evt: string, callback: (data: T) => void) => {
  socket.on(evt, callback);

  return () => {
    socket.removeAllListeners(evt);
  };
};

export const onExternalSetupEvent = (evt: string, callback: (socket: Socket) => void) => {
  socket.on(evt, () => callback(socket));

  return () => {
    socket.removeAllListeners(evt);
  };
};

export const dispatchExternalEvent = <T>(evt: string, args?: T) => {
  socket.emit(evt, args);
};
