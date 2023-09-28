import {TasksActionTypes} from "../consts";
import {TasksAction, TasksSchema} from "../types";

const initialState: TasksSchema = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const tasksReducer = (
  state = initialState,
  action: TasksAction
): TasksSchema => {
  switch (action.type) {
    case TasksActionTypes.FETCH_TASKS:
      return {isLoading: true, data: []};
    case TasksActionTypes.FETCH_TASKS_SUCCESS:
      return {isLoading: false, data: action.payload};
    case TasksActionTypes.FETCH_TASKS_ERROR:
      return {isLoading: false, error: action.payload};
    default:
      return state;
  }
};
