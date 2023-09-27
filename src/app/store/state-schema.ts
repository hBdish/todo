import {TasksSchema} from "../../pages";
import {ProjectSchema} from "../../components";

export interface StateSchema {
  projects: ProjectSchema;
  tasks: TasksSchema;
}
