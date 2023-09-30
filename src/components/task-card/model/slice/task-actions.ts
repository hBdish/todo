import {TasksActionTypes} from "../../../task-table/model/consts";
import {TaskType} from "../types/task-schema";
import {TaskActionTypes, TaskSyncActionTypes} from "../consts/consts";

export const requestTasksSuccess = (data: TaskType[]) => {
  return {type: TasksActionTypes.FETCH_TASKS_SUCCESS, payload: data};
};

export const setEditableTask = (data: TaskType) => {
  return {type: TaskSyncActionTypes.SET_EDITABLE_TASK, payload: data};
};

export const patchTask = (data: TaskType) => {
  return {type: TaskActionTypes.PATCH_TASK, payload: data};
};
