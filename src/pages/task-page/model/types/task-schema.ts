import {TaskActionTypes, TaskSyncActionTypes} from "../consts";

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

interface TaskSchema {
  task?: TaskType;
  editableTask?: TaskType
}

interface TaskActionPatch {
  type: TaskActionTypes.PATCH_TASK;
}

interface TaskActionSetTask {
  type: TaskSyncActionTypes.SET_TASK;
  payload: TaskType;
}

interface TaskActionEditTask {
  type: TaskSyncActionTypes.SET_EDITABLE_TASK;
  payload: TaskType;
}

type TaskActionSync = TaskActionSetTask | TaskActionEditTask

type TaskAction = TaskActionSync | TaskActionPatch

export type {TaskSchema, TaskType, TaskAction};
