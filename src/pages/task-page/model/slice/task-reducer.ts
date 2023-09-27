import {TaskActionTypes} from "../consts";
import {TaskAction, TasksSchema} from "../types";

const initialState: TasksSchema = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const taskReducer = (
  state = initialState,
  action: TaskAction
): TasksSchema => {
  switch (action.type) {
    case TaskActionTypes.FETCH_TASKS:
      return {isLoading: true, data: []};
    case TaskActionTypes.FETCH_TASKS_SUCCESS:
      return {isLoading: false, data: action.payload};
    case TaskActionTypes.FETCH_TASKS_ERROR:
      return {isLoading: false, error: action.payload};
    default:
      return state;
  }
};
