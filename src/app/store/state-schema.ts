import {TasksSchema} from "../../pages";
import {ProjectSchema} from "../../components";
import {TaskSchema} from "../../components/task-card/model/types/task-schema";

export interface StateSchema {
  projects: ProjectSchema;
  tasks: TasksSchema;
  task: TaskSchema
}
