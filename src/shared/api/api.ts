import {CommonHttpClient} from "./client";
import {TaskType} from "../../pages/task-page/model/types/task-schema";

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
}

class ProjectsService {
  static fetchAllProjects() {
    return apiClient.get<TaskType[]>("/projects");
  }
}

export {TasksService, ProjectsService};
