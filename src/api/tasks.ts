import { IResponse } from "../interfaces/IResponse";
import { ITaskColumn } from "../interfaces/ITask";
import { dispatchExternalEvent, onExternalEvent } from "../utils/events";

export const subscribeToTasks = (projectId: string) => {
  dispatchExternalEvent("tasks:subscribe", projectId);

  return () => {
    dispatchExternalEvent("tasks:unsubscribe", { projectId });
  };
};

export const createTask = (title: string, description: string, columnId: string) => {
  dispatchExternalEvent("tasks:create-task", { title, description, columnId });
};

export const requestColumns = (projectId: string) => {
  dispatchExternalEvent("tasks:get-columns", { projectId });
};

export const createColumn = (projectId: string, name: string, color: string) => {
  dispatchExternalEvent("tasks:create-column", { projectId, name, color });
};

export const subscribeToNewColumn = (callback: (column: IResponse<ITaskColumn>) => void) => {
  const unsubscribeFromNewColumnEvt = onExternalEvent("tasks:new-column", callback);

  return () => {
    unsubscribeFromNewColumnEvt();
  };
};

export const subscribeToColumns = (callback: (messages: IResponse<ITaskColumn[]>) => void) => {
  const unsubscribeFromColumnsEvt = onExternalEvent("tasks:columns", callback);

  return () => {
    unsubscribeFromColumnsEvt();
  };
};
