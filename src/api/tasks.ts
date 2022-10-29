import { IZippedColumns } from "../interfaces/IZippedColumns";
import { IResponse } from "../interfaces/IResponse";
import { ITask, ITaskColumnRaw } from "../interfaces/ITask";
import { dispatchExternalEvent, onExternalEvent } from "../utils/events";

export const subscribeToTasks = (projectId: string) => {
  dispatchExternalEvent("tasks:subscribe", { projectId });

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

export const deleteColumn = (columnId: string) => {
  dispatchExternalEvent("tasks:delete-column", { columnId });
};

export const deleteTask = (columnId: string, taskId: string) => {
  dispatchExternalEvent("tasks:delete-task", { taskId, columnId });
};

export const moveTasks = (projectId: string, zippedColumns: IZippedColumns) => {
  dispatchExternalEvent("tasks:move-tasks", { projectId, zippedColumns });
};

export const subscribeToMoveTasks = (callback: (columns: IResponse<IZippedColumns>) => void) => {
  const unsubscribeFromMoveTasksEvt = onExternalEvent("tasks:tasks-moved", callback);

  return () => {
    unsubscribeFromMoveTasksEvt();
  };
};

export const subscribeToDeleteTask = (
  callback: (deletedTask: IResponse<{ columnId: string; taskId: string }>) => void
) => {
  const unsubscribeFromDeleteTaskEvt = onExternalEvent("tasks:task-deleted", callback);

  return () => {
    unsubscribeFromDeleteTaskEvt();
  };
};

export const subscribeToDeleteColumn = (callback: (deletedColumn: IResponse<{ columnId: string }>) => void) => {
  const unsubscribeFromDeleteColumnEvt = onExternalEvent("tasks:column-deleted", callback);

  return () => {
    unsubscribeFromDeleteColumnEvt();
  };
};

export const subscribeToNewTask = (callback: (newTask: IResponse<{ columnId: string; task: ITask }>) => void) => {
  const unsubscribeFromNewTaskEvt = onExternalEvent("tasks:new-task", callback);

  return () => {
    unsubscribeFromNewTaskEvt();
  };
};

export const subscribeToNewColumn = (callback: (column: IResponse<ITaskColumnRaw>) => void) => {
  const unsubscribeFromNewColumnEvt = onExternalEvent("tasks:new-column", callback);

  return () => {
    unsubscribeFromNewColumnEvt();
  };
};

export const subscribeToColumns = (callback: (columns: IResponse<ITaskColumnRaw[]>) => void) => {
  const unsubscribeFromColumnsEvt = onExternalEvent("tasks:columns", callback);

  return () => {
    unsubscribeFromColumnsEvt();
  };
};
