import {TaskTableActionTypes, TaskTableSyncActionTypes} from "../consts";
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


export const taskTableReducer = (
  state = initialState,
  action: TasksAction
): TasksSchema => {
  switch (action.type) {
    case TaskTableSyncActionTypes.MOVE_TASK: {
      const map =
        moveTaskHelper(
          action.payload.keySet,
          action.payload.task,
          state.allMap
        )

      return {
        allMap: map
      };
    }
    case TaskTableActionTypes.FETCH_TASKS: {
      return {isLoading: true, data: []};
    }
    case TaskTableActionTypes.FETCH_TASKS_SUCCESS: {
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
    }
    case TaskTableActionTypes.FETCH_TASKS_ERROR: {
      return {isLoading: false, error: action.payload};
    }
    case TaskTableActionTypes.PUSH_NEW_TASK: {
      if (!state.data) return state
      const newArray = state.data
      newArray.push(action.payload)
      const newMap = sortTasks(
        new Map<TaskStatus, Map<string, TaskType>>(),
        new Map<string, TaskType>(),
        new Map<string, TaskType>(),
        new Map<string, TaskType>(),
        newArray
      )
      return {allMap: newMap, data: state.data};
    }
    case TaskTableActionTypes.DELETE_SYNC_TASK: {
      if (!state.data) return state
      const newMapWithoutDeletedElement = state.data.filter(el => el.id !== action.payload)

      const maps = sortTasks(
        new Map<TaskStatus, Map<string, TaskType>>(),
        new Map<string, TaskType>(),
        new Map<string, TaskType>(),
        new Map<string, TaskType>(),
        newMapWithoutDeletedElement
      )

      return {allMap: maps, data: newMapWithoutDeletedElement};
    }
    default: {
      return state;
    }
  }
};
