import {TaskActionTypes, TaskSyncActionTypes} from "../../../index";

export type TaskStatus = "Queue" | "Development" | "Done"

interface TaskType {
  id?: string;
  projectId?: string;
  number?: string;
  title?: string;
  description?: string;
  dateCreated?: string;
  timeInWork?: number;
  dateCompleted?: string;
  priority?: string;
  status?: TaskStatus;
}

interface TaskSchema {
  task?: TaskType;
  editableTask?: TaskType
}

interface TaskActionPatch {
  type: TaskActionTypes.PATCH_TASK;
}

interface TaskActionCreate {
  type: TaskActionTypes.CREATE_TASK;
}

interface TaskActionDelete {
  type: TaskActionTypes.DELETE_TASK;
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

type TaskAction = TaskActionSync | TaskActionPatch | TaskActionCreate | TaskActionDelete

export type {TaskSchema, TaskType, TaskAction};
