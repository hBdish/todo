import { TaskActionTypes } from "../consts";
import { TaskType } from "../types";

export const requestTasksSuccess = (data: TaskType[]) => {
  return { type: TaskActionTypes.FETCH_TASKS_SUCCESS, payload: data };
};
