import {TasksActionTypes} from "../../../task-table/model/consts";
import {TaskType} from "../types/task-schema";

export const requestTasksSuccess = (data: TaskType[]) => {
  return {type: TasksActionTypes.FETCH_TASKS_SUCCESS, payload: data};
};
