import {ProjectActionTypes, ProjectSyncActionTypes} from "../consts";

interface ProjectType {
  id?: string
  name?: string,
  type?: string
}

interface ProjectSchema {
  data?: ProjectType[]
  isLoading?: boolean
  error?: string
  selectedProjectId?: string;
}

interface ProjectSyncAction {
  type: ProjectSyncActionTypes.SET_SELECTED_PROJECT_ID;
  payload: string;
}

interface ProjectActionFetch {
  type: ProjectActionTypes.FETCH_PROJECTS;
}

interface ProjectActionSuccess {
  type: ProjectActionTypes.FETCH_PROJECTS_SUCCESS;
  payload: ProjectType[];
}

interface ProjectActionError {
  type: ProjectActionTypes.FETCH_PROJECTS_ERROR;
  payload: string;
}

interface ProjectActionDelete {
  type: ProjectActionTypes.DELETE_PROJECT;
}

interface TriggerProjectActionCreate {
  type: ProjectActionTypes.TRIGGER_CREATE_NEW_PROJECT;
}

interface ProjectActionCreate {
  type: ProjectActionTypes.CREATE_NEW_PROJECT;
  payload: ProjectType;
}

interface ProjectActionPatch {
  type: ProjectActionTypes.PATCH_PROJECT;
  payload: ProjectType;
}

type ProjectAsyncAction =
  ProjectActionFetch
  | ProjectActionSuccess
  | ProjectActionError
  | ProjectActionDelete
  | ProjectActionCreate
  | ProjectActionPatch
  | TriggerProjectActionCreate


type ProjectAction = ProjectSyncAction | ProjectAsyncAction

export type {ProjectSchema, ProjectAction, ProjectType};
