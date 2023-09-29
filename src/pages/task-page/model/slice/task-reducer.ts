import {TaskAction, TaskSchema} from "../types/task-schema";
import {TaskActionTypes, TaskSyncActionTypes} from "../consts";

const initialState: TaskSchema = {
  task: undefined,
  editableTask: undefined
};

export const taskReducer = (
  state = initialState,
  action: TaskAction
): TaskSchema => {
  switch (action.type) {
    case TaskActionTypes.PATCH_TASK:
      return state;
    case TaskSyncActionTypes.SET_TASK:
      return {task: action.payload, editableTask: action.payload};
    case TaskSyncActionTypes.SET_EDITABLE_TASK:
      return {editableTask: action.payload};
    default:
      return state;
  }
};
