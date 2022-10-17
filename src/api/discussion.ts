import { dispatchExternalEvent, onExternalEvent } from "../utils/events";

export const subscribeToMessages = (callback: (id: string) => void) => {
  const unsubscribeFromMessagesEvt = onExternalEvent("discussion:external-message", () => callback(""));

  return () => {
    unsubscribeFromMessagesEvt();
  };
};

export const sendDiscussionMessage = (message: string, projectId: string, token: string) => {
  dispatchExternalEvent("discussion:message", { message, projectId, token });
};
