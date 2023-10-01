import {ProjectActionTypes, ProjectSyncActionTypes} from "../consts";
import {ProjectType} from "../types/types";

export const setSelectedProjectId = (id: string) => {
  return {type: ProjectSyncActionTypes.SET_SELECTED_PROJECT_ID, payload: id};
};

export const requestProjectsSuccess = (data: ProjectType[]) => {
  return {type: ProjectActionTypes.FETCH_PROJECTS_SUCCESS, payload: data};
};


export const deleteProject = () => {
  return {type: ProjectActionTypes.DELETE_PROJECT};
};

