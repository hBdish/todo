import { TaskTableSyncActionTypes } from "../consts";
import { TasksMoveType } from "../types";
import { TaskSyncActionTypes } from "../../../task-card";
import {
  TaskStatus,
  TaskType,
} from "../../../task-card/model/types/task-schema";

export const moveTaskOnTheTable = (payload: TasksMoveType) => {
  return { type: TaskTableSyncActionTypes.MOVE_TASK, payload };
};

export const setNewTaskStatus = (newTask: TaskType, status: TaskStatus) => {
  return {
    type: TaskSyncActionTypes.SET_EDITABLE_TASK,
    payload: { ...newTask, status },
  };
};
