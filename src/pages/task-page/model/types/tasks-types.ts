import {TasksActionTypes, TasksSyncActionTypes} from "../consts";
import {TaskStatus, TaskType} from "./task-schema";

interface TasksSchema {
  data?: TaskType[];
  isLoading?: boolean;
  error?: string;
  allMap?: Map<TaskStatus, Map<string, TaskType>>
}

export interface TasksMoveType {
  task: TaskType
  keySet: TaskStatus
}

interface TasksActionMove {
  type: TasksSyncActionTypes.MOVE_TASK;
  payload: TasksMoveType
}

interface TasksActionFetch {
  type: TasksActionTypes.FETCH_TASKS;
}

interface TasksActionSuccess {
  type: TasksActionTypes.FETCH_TASKS_SUCCESS;
  payload: TaskType[];
}

interface TasksActionError {
  type: TasksActionTypes.FETCH_TASKS_ERROR;
  payload: string;
}

type TasksAsyncAction = TasksActionFetch | TasksActionSuccess | TasksActionError;
type TasksAction = TasksAsyncAction | TasksActionMove

export type {TasksSchema, TasksAction};
