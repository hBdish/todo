import { RouteProps } from "react-router-dom";
import {
  AppRoutes,
  getRouteTask,
  getRoutProject,
} from "../../../shared/consts";
import ProjectPage from "../../../pages/project-page/project-page";
import TaskPage from "../../../pages/task-page/task-page";

const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.PROJECT]: {
    path: getRoutProject(),
    element: <ProjectPage />,
  },
  [AppRoutes.TASK]: {
    path: getRouteTask(":id"),
    element: <TaskPage />,
  },

  // last
  [AppRoutes.NOT_FOUND]: {
    path: "*",
    element: <ProjectPage />,
  },
};

export { routeConfig };
