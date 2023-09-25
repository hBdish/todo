export enum AppRoutes {
  PROJECT = "project",
  TASK = "task",

  // last
  NOT_FOUND = "not_found",
}

export const getRoutProject = () => `/${AppRoutes.PROJECT}`;
export const getRouteTask = (id: string) => `/${AppRoutes.TASK}/${id}`;
