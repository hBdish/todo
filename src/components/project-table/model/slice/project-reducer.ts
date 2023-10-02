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
    case ProjectSyncActionTypes.SET_SELECTED_PROJECT_ID: {
      return {selectedProjectId: action.payload, data: state.data, isLoading: false};
    }
    case ProjectActionTypes.CREATE_NEW_PROJECT: {
      const newData = state.data
      if (!newData) return {data: state.data}
      newData.push(action.payload)
      return {data: newData, isLoading: false};
    }
    case ProjectActionTypes.PATCH_PROJECT: {
      const arrayWithProjects = state.data
      if (arrayWithProjects === undefined) return state
      const findId = arrayWithProjects.findIndex((el) => el.id === action.payload.id)
      arrayWithProjects[findId] = action.payload
      return {data: arrayWithProjects};
    }
    case ProjectActionTypes.DELETE_PROJECT: {
      const allProject = state
        .data?.filter(el => el.id !== state.selectedProjectId)
      return {data: allProject, selectedProjectId: state.selectedProjectId};
    }
    case ProjectActionTypes.FETCH_PROJECTS: {
      return {isLoading: true, data: []};
    }
    case ProjectActionTypes.FETCH_PROJECTS_SUCCESS: {
      return {isLoading: false, data: action.payload};
    }
    case ProjectActionTypes.FETCH_PROJECTS_ERROR: {
      return {isLoading: false, error: action.payload};
    }
    default: {
      return state;
    }
  }
};
