import {TasksActionTypes, TasksSyncActionTypes} from "../consts";
import {TaskStatus, TaskType} from "../../../task-card/model/types/task-schema";

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

interface TasksActionPush {
  type: TasksActionTypes.PUSH_NEW_TASK;
  payload: TaskType;
}

interface TasksActionDelete {
  type: TasksActionTypes.DELETE_SYNC_TASK;
  payload: string;
}

interface TasksActionSuccess {
  type: TasksActionTypes.FETCH_TASKS_SUCCESS;
  payload: TaskType[];
}

interface TasksActionError {
  type: TasksActionTypes.FETCH_TASKS_ERROR;
  payload: string;
}

type TasksAsyncAction = TasksActionFetch | TasksActionSuccess | TasksActionError | TasksActionPush | TasksActionDelete
type TasksAction = TasksAsyncAction | TasksActionMove

export type {TasksSchema, TasksAction};
