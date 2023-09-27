import {ProjectActionTypes, ProjectSyncActionTypes} from "../consts";
import {ProjectAction, ProjectSchema} from "../types";

const initialState: ProjectSchema = {
  selectedProjectId: undefined,
  data: [],
  error: undefined,
  isLoading: false
};

export const projectReducer = (
  state = initialState,
  action: ProjectAction
): ProjectSchema => {
  switch (action.type) {
    case ProjectSyncActionTypes.SET_SELECTED_PROJECT_ID:
      return {selectedProjectId: action.payload};
    case ProjectActionTypes.FETCH_PROJECTS:
      return {isLoading: true, data: []};
    case ProjectActionTypes.FETCH_PROJECTS_SUCCESS:
      return {isLoading: false, data: action.payload};
    case ProjectActionTypes.FETCH_PROJECTS_ERROR:
      return {isLoading: false, error: action.payload};
    default:
      return state;
  }
};
