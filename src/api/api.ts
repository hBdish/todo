import { TaskType } from "../pages";
import { CommonHttpClient } from "./client";

const apiClient = new CommonHttpClient({
  config: { baseURL: "http://localhost:8000" },
});

class TasksService {
  static fetchAllTasks() {
    return apiClient.get<TaskType[]>("/tasks");
  }
}

export { TasksService };
