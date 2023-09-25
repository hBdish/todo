import { TaskActionTypes } from "../consts";
import { FetchTaskAction, TasksSchema } from "../types";

const initialState: TasksSchema = {
  data: [],
  isLoading: false,
  error: undefined,
};

export const taskReducer = (
  state = initialState,
  action: FetchTaskAction
): TasksSchema => {
  switch (action.type) {
    case TaskActionTypes.FETCH_TASKS:
      return { isLoading: true, data: [] };
    case TaskActionTypes.FETCH_TASKS_SUCCESS:
      return { isLoading: false, data: action.payload };
    case TaskActionTypes.FETCH_TASKS_ERROR:
      return { isLoading: false, error: action.payload };
    default:
      return state;
  }
};
