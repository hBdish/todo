import {CommonHttpClient} from "./client";
import {TaskType} from "../../components/task-card/model/types/task-schema";
import {ProjectType} from "../../components/project-table/model/types/types";

const apiClient = new CommonHttpClient({
  config: {baseURL: "https://todoback-0ei2krkw.b4a.run"}, // TODO ВЫНЕСТИ
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
        title: newTask.title,
        description: '',
        status: "Queue",
        dateCreated: '2002-02-07',
        dateCompleted: '2002-02-07',
        priority: '',
        projectId: newTask.projectId,
        timeInWork: 123,
        number: '',
      }
    } else {
      task = newTask
    }

    return apiClient.post<TaskType>(`/tasks`, task);
  }

  static deleteTaskById(taskId: string) {
    console.log(taskId)
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
