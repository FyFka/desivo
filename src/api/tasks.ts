import { IZippedColumns } from "../interfaces/IZippedColumns";
import { IResponse } from "../interfaces/IResponse";
import { ILabel, ITask, ITaskColumnRaw } from "../interfaces/ITask";
import { dispatchExternalEvent, onExternalEvent } from "../utils/events";

export const subscribeToTasks = (projectId: string) => {
  dispatchExternalEvent("task:subscribe", { projectId });

  return () => {
    dispatchExternalEvent("task:unsubscribe", { projectId });
  };
};

export const createTask = (title: string, description: string, columnId: string) => {
  dispatchExternalEvent("task:create-task", { title, description, columnId });
};

export const requestColumns = (projectId: string) => {
  dispatchExternalEvent("task:get-columns", { projectId });
};

export const createColumn = (projectId: string, name: string, color: string) => {
  dispatchExternalEvent("task:create-column", { projectId, name, color });
};

export const deleteColumn = (columnId: string) => {
  dispatchExternalEvent("task:delete-column", { columnId });
};

export const updateTask = (taskId: string, columnId: string, description: string, title: string) => {
  dispatchExternalEvent("task:update-task", { taskId, columnId, description, title });
};

export const deleteTask = (columnId: string, taskId: string) => {
  dispatchExternalEvent("task:delete-task", { taskId, columnId });
};

export const moveTasks = (projectId: string, zippedColumns: IZippedColumns) => {
  dispatchExternalEvent("task:move-tasks", { projectId, zippedColumns });
};

export const createLabel = (taskId: string, columnId: string, name: string, color: string) => {
  dispatchExternalEvent("task:create-label", { taskId, columnId, name, color });
};

export const subscribeToMoveTasks = (callback: (columns: IResponse<IZippedColumns>) => void) => {
  const unsubscribeFromMoveTasksEvt = onExternalEvent("task:tasks-moved", callback);

  return () => {
    unsubscribeFromMoveTasksEvt();
  };
};

export const subscribeToDeleteTask = (
  callback: (deletedTask: IResponse<{ columnId: string; taskId: string }>) => void
) => {
  const unsubscribeFromDeleteTaskEvt = onExternalEvent("task:task-deleted", callback);

  return () => {
    unsubscribeFromDeleteTaskEvt();
  };
};

export const subscribeToUpdateTask = (
  callback: (updatedTask: IResponse<{ taskId: string; title: string; description: string }>) => void
) => {
  const unsubscribeFromUpdateTaskEvt = onExternalEvent("task:task-updated", callback);

  return () => {
    unsubscribeFromUpdateTaskEvt();
  };
};

export const subscribeToNewLabel = (callback: (newLabel: IResponse<{ taskId: string; label: ILabel }>) => void) => {
  const unsubscribeFromNewLabelEvt = onExternalEvent("task:label-created", callback);

  return () => {
    unsubscribeFromNewLabelEvt();
  };
};

export const subscribeToDeleteColumn = (callback: (deletedColumn: IResponse<{ columnId: string }>) => void) => {
  const unsubscribeFromDeleteColumnEvt = onExternalEvent("task:column-deleted", callback);

  return () => {
    unsubscribeFromDeleteColumnEvt();
  };
};

export const subscribeToNewTask = (callback: (newTask: IResponse<{ columnId: string; task: ITask }>) => void) => {
  const unsubscribeFromNewTaskEvt = onExternalEvent("task:new-task", callback);

  return () => {
    unsubscribeFromNewTaskEvt();
  };
};

export const subscribeToNewColumn = (callback: (column: IResponse<ITaskColumnRaw>) => void) => {
  const unsubscribeFromNewColumnEvt = onExternalEvent("task:new-column", callback);

  return () => {
    unsubscribeFromNewColumnEvt();
  };
};

export const subscribeToColumns = (callback: (columns: IResponse<ITaskColumnRaw[]>) => void) => {
  const unsubscribeFromColumnsEvt = onExternalEvent("task:columns", callback);

  return () => {
    unsubscribeFromColumnsEvt();
  };
};
