import {TaskType} from "../../pages";
import {CommonHttpClient} from "./client";

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
}

class ProjectsService {
  static fetchAllProjects() {
    return apiClient.get<TaskType[]>("/projects");
  }
}

export {TasksService, ProjectsService};
