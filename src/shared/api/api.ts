import {CommonHttpClient} from "./client";
import {TaskType} from "../../components/task-card/model/types/task-schema";
import {ProjectType} from "../../components/project-table/model/types/types";

const apiClient = new CommonHttpClient({
  config: {baseURL: "https://todoback-0ei2krkw.b4a.run"}, // TODO ВЫНЕСТИ
});

class TasksService {
  static fetchAllTasks(data: { projectId: string, search: string }) {
    return apiClient.get<TaskType[]>(`/tasks?q=${data.search}`, {
      params: {
        projectId: data.projectId,
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

    return apiClient.post<TaskType>(`/tasks`, newTask);
  }

  static deleteTaskById(taskId: string) {
    return apiClient.delete<object>(`/tasks/${taskId}`);
  }
}

class ProjectsService {
  static fetchAllProjects() {
    return apiClient.get<TaskType[]>("/projects");
  }

  static createProject(newProject: ProjectType) {

    return apiClient.post<ProjectType>(`/projects`, newProject);
  }

  static editProject(newProject: ProjectType) {
    return apiClient.patch<ProjectType>(`/projects/${newProject.id}`, newProject, {
      headers: {
        "Content-Type": "application/json"
      },
    });
  }

  static deleteProjectById(projectId: string) {
    return apiClient.delete<object>(`/projects/${projectId}`);
  }
}

export {TasksService, ProjectsService};
