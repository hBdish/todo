import { TasksSchema } from "../../pages";
import { ProjectSchema } from "../../components";
import { TaskSchema } from "../../components/task-card/model/types/task-schema";
import { SearchSchema } from "../../components/search-filter/model/types";

export interface StateSchema {
  projects: ProjectSchema;
  tasks: TasksSchema;
  task: TaskSchema;
  search: SearchSchema;
}
