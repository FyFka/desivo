import { IResponse } from "../interfaces/IResponse";
import { ITaskColumn } from "../interfaces/ITask";
import { dispatchExternalEvent, onExternalEvent } from "../utils/events";

export const sendSubscriptionToTasks = (projectId: string) => {
  dispatchExternalEvent("tasks:subscribe", { projectId });
};

export const sendUnsubscriptionFromTasks = (projectId: string) => {
  dispatchExternalEvent("tasks:unsubscribe", { projectId });
};

export const getColumns = (projectId: string) => {
  dispatchExternalEvent("tasks:get-columns", { projectId });
};

export const subscribeToColumns = (callback: (messages: IResponse<ITaskColumn[]>) => void) => {
  const unsubscribeFromColumnsEvt = onExternalEvent("tasks:columns", callback);

  return () => {
    unsubscribeFromColumnsEvt();
  };
};
