import { Socket } from "socket.io-client";
import { onExternalEvent, onExternalSetupEvent } from "../utils/events";

export const subscribeToConnection = (callback: (id: string) => void) => {
  const unsubscribeFromConnectEvt = onExternalSetupEvent("connect", (setup: Socket) => callback(setup.id));
  const unsubscribeFromReconnectEvt = onExternalSetupEvent("reconnect", (setup: Socket) => callback(setup.id));
  const unsubscribeFromDisconnectEvt = onExternalEvent("disconnect", () => callback(""));

  return () => {
    unsubscribeFromConnectEvt();
    unsubscribeFromReconnectEvt();
    unsubscribeFromDisconnectEvt();
  };
};
