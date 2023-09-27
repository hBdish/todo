import {call, put, takeEvery} from "redux-saga/effects";
import {ProjectsService} from "../../../../shared";
import {ProjectType} from "../types/types";
import {requestProjectsSuccess} from "./project-action";
import {ProjectActionTypes} from "../consts";

function* fetchProjects() {
  try {
    const projects: ProjectType[] = yield call(ProjectsService.fetchAllProjects);
    yield put(requestProjectsSuccess(projects));
  } catch (e) {
    yield put({type: ProjectActionTypes.FETCH_PROJECTS_ERROR, error: e});
  }
}

function* projectSaga() {
  yield takeEvery(ProjectActionTypes.FETCH_PROJECTS, fetchProjects);
}

export {projectSaga};
