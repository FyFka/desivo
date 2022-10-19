import { IMessageRaw } from "../interfaces/IMessage";
import { IResponse } from "../interfaces/IResponse";
import { dispatchExternalEvent, onExternalEvent } from "../utils/events";

export const sendMessage = (message: string, projectId: string) => {
  dispatchExternalEvent("discussion:new-message", { message, projectId });
};

export const sendSubscriptionToNewMessage = (projectId: string) => {
  dispatchExternalEvent("discussion:subscribe", { projectId });
};

export const sendUnsubscriptionToNewMessage = (projectId: string) => {
  dispatchExternalEvent("discussion:unsubscribe", { projectId });
};

export const getMessagesHistory = (projectId: string, skip: number) => {
  dispatchExternalEvent("discussion:get-history", { projectId, skip });
};

export const subscribeToNewMessage = (callback: (newMessage: IResponse<IMessageRaw>) => void) => {
  const unsubscribeFromNewMessageEvt = onExternalEvent("discussion:external-message", callback);

  return () => {
    unsubscribeFromNewMessageEvt();
  };
};

export const subscribeToHistoryEnd = (callback: (historyEnd: IResponse<boolean>) => void) => {
  const unsubscribeFromHistoryEndEvt = onExternalEvent("discussion:messages-history-end", callback);

  return () => {
    unsubscribeFromHistoryEndEvt();
  };
};

export const subscribeToMessagesHistory = (callback: (messages: IResponse<IMessageRaw[]>) => void) => {
  const unsubscribeFromMessagesHistoryEvt = onExternalEvent("discussion:messages-history", callback);

  return () => {
    unsubscribeFromMessagesHistoryEvt();
  };
};
