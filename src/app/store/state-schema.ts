import {TasksSchema} from "../../pages";
import {ProjectSchema} from "../../components";
import {TaskSchema} from "../../pages/task-page/model/types/task-schema";

export interface StateSchema {
  projects: ProjectSchema;
  tasks: TasksSchema;
  task: TaskSchema
}
