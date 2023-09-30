import {CommonHttpClient} from "./client";
import {TaskType} from "../../components/task-card/model/types/task-schema";

const apiClient = new CommonHttpClient({
  config: {baseURL: "http://localhost:8000"},
});

class TasksService {
  static fetchAllTasks(projectId: string) {
    return apiClient.get<TaskType[]>("/tasks", {
      params: {
        projectId,
      },
    });
  }

  static editTask(newTask: TaskType) {
    return apiClient.patch<TaskType>(`/tasks/${newTask.id}`, newTask, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }

  static createTask(newTask: TaskType) {
    let task: TaskType

    if (!newTask || newTask.projectId) {
      task = {
        title: "",
        description: '',
        status: "Queue",
        dateCreated: '2002-02-07',
        dateCompleted: '2002-02-07',
        priority: '',
        projectId: newTask.projectId,
        timeInWork: 123,
        number: Math.random().toString(),
      }
    } else {
      task = newTask
    }

    console.log(task)
    return apiClient.post<TaskType>(`/tasks`, task);
  }
}

class ProjectsService {
  static fetchAllProjects() {
    return apiClient.get<TaskType[]>("/projects");
  }
}

export {TasksService, ProjectsService};
