import {TasksActionTypes} from "../consts";
import {TaskType} from "../types/task-schema";

export const requestTasksSuccess = (data: TaskType[]) => {
  return {type: TasksActionTypes.FETCH_TASKS_SUCCESS, payload: data};
};
