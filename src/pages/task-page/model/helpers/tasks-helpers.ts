import {TaskStatus, TaskType} from "../types/task-schema";

export const moveTaskHelper = (
  keySet: TaskStatus,
  moveTask: TaskType,
  map: Map<TaskStatus, Map<string, TaskType>> | undefined
): Map<TaskStatus, Map<string, TaskType>> | undefined => {
  map
    ?.get(moveTask.status)
    ?.delete(moveTask.id)

  moveTask.status = keySet

  map
    ?.get(keySet)
    ?.set(moveTask.id, moveTask)
  return map
}

export const sortTasks = (
  allMap: Map<TaskStatus, Map<string, TaskType>>,
  queueMap: Map<string, TaskType>,
  developmentMap: Map<string, TaskType>,
  doneMap: Map<string, TaskType>,
  allTasksArray: TaskType[]
) => {
  allTasksArray.map(task => {
    switch (task.status) {
      case "Development":
        developmentMap.set(task.id, task)
        break;
      case "Done":
        doneMap.set(task.id, task)
        break;
      case "Queue":
        queueMap.set(task.id, task)
        break;
    }
  })

  allMap
    .set("Queue", queueMap)
    .set("Done", doneMap)
    .set("Development", developmentMap)

  return allMap
}
