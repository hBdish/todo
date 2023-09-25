import { TaskActionTypes } from "../consts";

interface TaskType {
  id: number;
  project1: number;
  number: number;
  title: string;
  description: string;
  dateCreated: string;
  timeInWork: number;
  dateCompleted: string;
  priority: string;
  status: string;
}

interface TasksSchema {
  data?: TaskType[];
  isLoading?: boolean;
  error?: string;
}

interface TaskAction {
  type: TaskActionTypes.FETCH_TASKS;
}

interface TaskActionSuccess {
  type: TaskActionTypes.FETCH_TASKS_SUCCESS;
  payload: TaskType[];
}

interface TaskActionError {
  type: TaskActionTypes.FETCH_TASKS_ERROR;
  payload: string;
}

type FetchTaskAction = TaskAction | TaskActionSuccess | TaskActionError;

export type { TasksSchema, TaskType, FetchTaskAction };
