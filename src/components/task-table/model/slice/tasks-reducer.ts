import {TasksActionTypes, TasksSyncActionTypes} from "../consts";
import {TasksAction, TasksSchema} from "../types";
import {TaskStatus, TaskType} from "../../../task-card/model/types/task-schema";
import {moveTaskHelper, sortTasks} from "../helpers/tasks-helpers";

const initialState: TasksSchema = {
  data: [],
  isLoading: false,
  error: undefined,

  allMap: new Map([
    ['Queue', new Map<string, TaskType>()],
    ['Done', new Map<string, TaskType>()],
    ['Development', new Map<string, TaskType>()],
  ]),
};


export const tasksReducer = (
  state = initialState,
  action: TasksAction
): TasksSchema => {
  switch (action.type) {
    case TasksSyncActionTypes.MOVE_TASK:
      const map =
        moveTaskHelper(
          action.payload.keySet,
          action.payload.task,
          state.allMap
        )

      return {
        allMap: map
      };
    case TasksActionTypes.FETCH_TASKS:
      return {isLoading: true, data: []};
    case TasksActionTypes.FETCH_TASKS_SUCCESS:

      const allMap = sortTasks(
        new Map<TaskStatus, Map<string, TaskType>>(),
        new Map<string, TaskType>(),
        new Map<string, TaskType>(),
        new Map<string, TaskType>(),
        action.payload
      )

      return {
        isLoading: false,
        data: action.payload,
        allMap
      };
    case TasksActionTypes.FETCH_TASKS_ERROR:
      return {isLoading: false, error: action.payload};
    default:
      return state;
  }
};
