import {TasksActionTypes} from "../consts";
import {TaskType} from "./task-schema";


interface TasksSchema {
  data?: TaskType[];
  isLoading?: boolean;
  error?: string;

  //
  queueTasks?: Map<string, TaskType>;
  developmentTasks?: Map<string, TaskType>;
  doneTasks?: Map<string, TaskType>;
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

type TasksAction = TasksActionFetch | TasksActionSuccess | TasksActionError;

export type {TasksSchema, TasksAction};
