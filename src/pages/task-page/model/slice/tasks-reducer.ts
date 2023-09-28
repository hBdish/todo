import {TasksActionTypes, TasksSyncActionTypes} from "../consts";
import {TasksAction, TasksSchema} from "../types";
import {TaskStatus, TaskType} from "../types/task-schema";

const initialState: TasksSchema = {
  data: [],
  isLoading: false,
  error: undefined,

  allMap: new Map([
    ['Queue', new Map<string, TaskType>()],
    ['Done', new Map<string, TaskType>()],
    ['Development', new Map<string, TaskType>()],
  ]),

  queueTasks: new Map<string, TaskType>(),
  doneTasks: new Map<string, TaskType>(),
  developmentTasks: new Map<string, TaskType>()
};

export const tasksReducer = (
  state = initialState,
  action: TasksAction
): TasksSchema => {
  switch (action.type) {
    case TasksSyncActionTypes.MOVE_TASK:


      const keySet = action.payload.keySet
      const moveTask = action.payload.task

      console.log(keySet)
      console.log(moveTask.status)
      console.log(moveTask)


      return state;
    case TasksActionTypes.FETCH_TASKS:
      return {isLoading: true, data: []};
    case TasksActionTypes.FETCH_TASKS_SUCCESS:
      const allMap = new Map<TaskStatus, Map<string, TaskType>>()
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
            // state.allMap?.get("Queue").set(task.id, task)
            queueMap.set(task.id, task)
            // state.allMap
            //   ?.get("Queue")?.set(task.id, task)
            return null
          default:
            return state
        }
      })

      allMap.set("Queue", queueMap).set("Done", doneMap).set("Development", developmentMap)

      return {
        isLoading: false,
        data: action.payload,
        developmentTasks: developmentMap,
        queueTasks: queueMap,
        doneTasks: doneMap,
        allMap
      };
    case TasksActionTypes.FETCH_TASKS_ERROR:
      return {isLoading: false, error: action.payload};
    default:
      return state;
  }
};
