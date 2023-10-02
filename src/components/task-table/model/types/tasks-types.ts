import { TaskTableActionTypes, TaskTableSyncActionTypes } from "../consts";
import {
  TaskStatus,
  TaskType,
} from "../../../task-card/model/types/task-schema";

interface TasksSchema {
  data?: TaskType[];
  isLoading?: boolean;
  error?: string;
  allMap?: Map<TaskStatus, Map<string, TaskType>>;
}

export interface TasksMoveType {
  task: TaskType;
  keySet: TaskStatus;
}

interface TasksActionMove {
  type: TaskTableSyncActionTypes.MOVE_TASK;
  payload: TasksMoveType;
}

interface TasksActionFetch {
  type: TaskTableActionTypes.FETCH_TASKS;
}

interface TasksActionPush {
  type: TaskTableActionTypes.PUSH_NEW_TASK;
  payload: TaskType;
}

interface TasksActionDelete {
  type: TaskTableActionTypes.DELETE_SYNC_TASK;
  payload: string;
}

interface TasksActionSuccess {
  type: TaskTableActionTypes.FETCH_TASKS_SUCCESS;
  payload: TaskType[];
}

interface TasksActionError {
  type: TaskTableActionTypes.FETCH_TASKS_ERROR;
  payload: string;
}

type TasksAsyncAction =
  | TasksActionFetch
  | TasksActionSuccess
  | TasksActionError
  | TasksActionPush
  | TasksActionDelete;
type TasksAction = TasksAsyncAction | TasksActionMove;

export type { TasksSchema, TasksAction };
