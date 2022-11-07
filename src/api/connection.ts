import { Socket } from "socket.io-client";
import { IResponse } from "../interfaces/IResponse";
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

export const subscribeToReconnection = (callback: (id: string) => void) => {
  const unsubscribeFromReconnectEvt = onExternalSetupEvent("connect", (setup: Socket) => callback(setup.id));

  return () => {
    unsubscribeFromReconnectEvt();
  };
};

export const subscribeToGlobalError = (callback: (errResp: IResponse) => void) => {
  const unsubscribeFromGlobalErrorEvt = onExternalEvent("global:error", callback);

  return () => {
    unsubscribeFromGlobalErrorEvt();
  };
};
