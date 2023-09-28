import {TasksActionTypes} from "../consts";
import {TasksAction, TasksSchema} from "../types";
import {TaskType} from "../types/task-schema";

const initialState: TasksSchema = {
  data: [],
  isLoading: false,
  error: undefined,


  queueTasks: new Map<string, TaskType>(),
  doneTasks: new Map<string, TaskType>(),
  developmentTasks: new Map<string, TaskType>()
};

export const tasksReducer = (
  state = initialState,
  action: TasksAction
): TasksSchema => {
  switch (action.type) {
    case TasksActionTypes.FETCH_TASKS:
      return {isLoading: true, data: []};
    case TasksActionTypes.FETCH_TASKS_SUCCESS:
      const queueMap = new Map<string, TaskType>()
      const developmentMap = new Map<string, TaskType>()
      const doneMap = new Map<string, TaskType>()
      const allTasksArray = action.payload

      allTasksArray.map(task => {
        switch (task.status) {
          case "Development":
            developmentMap.set(task.id, task)
            return null
          case "Done":
            doneMap.set(task.id, task)
            return null
          case "Queue":
            queueMap.set(task.id, task)
            return null
        }
      })

      return {
        isLoading: false,
        data: action.payload,
        developmentTasks: developmentMap,
        queueTasks: queueMap,
        doneTasks: doneMap
      };
    case TasksActionTypes.FETCH_TASKS_ERROR:
      return {isLoading: false, error: action.payload};
    default:
      return state;
  }
};
