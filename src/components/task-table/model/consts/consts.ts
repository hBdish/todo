export enum TaskTableActionTypes {
  FETCH_TASKS = "FETCH_TASKS",
  FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
  FETCH_TASKS_ERROR = "FETCH_TASKS_ERROR",
  PUSH_NEW_TASK = "PUSH_NEW_TASK",
  DELETE_SYNC_TASK = "DELETE_SYNC_TASK",
}

export enum TaskTableSyncActionTypes {
  MOVE_TASK = "MOVE_TASK",
}
