import { call, put, select, takeEvery } from "redux-saga/effects";
import { ProjectsService } from "../../../../shared";
import { ProjectType } from "../types/types";
import { requestProjectsSuccess } from "./project-action";
import { ProjectActionTypes } from "../consts";
import { StateSchema } from "../../../../app/store";
import { SESSION_KEY_PROJECT } from "../../../../shared/consts/storage";

function* fetchProjects() {
  try {
    const projects: ProjectType[] = yield call(
      ProjectsService.fetchAllProjects,
    );
    yield put(requestProjectsSuccess(projects));
  } catch (e) {
    yield put({ type: ProjectActionTypes.FETCH_PROJECTS_ERROR, error: e });
  }
}

function* deleteProjects() {
  const projectId: string = yield select(
    (state: StateSchema) => state.projects.selectedProjectId,
  );

  try {
    yield call(ProjectsService.deleteProjectById, projectId);
  } catch (e) {
    console.log(e);
  }
}

function* createProjects() {
  const newProject: ProjectType = JSON.parse(
    sessionStorage.getItem(SESSION_KEY_PROJECT) ?? "",
  );

  try {
    const project: ProjectType = yield call(
      ProjectsService.createProject,
      newProject,
    );
    yield put({
      type: ProjectActionTypes.CREATE_NEW_PROJECT,
      payload: project,
    });
  } catch (e) {
    console.log(e);
  }
}

function* patchProjects() {
  const newProject: ProjectType = JSON.parse(
    sessionStorage.getItem(SESSION_KEY_PROJECT) ?? "",
  );

  try {
    yield call(ProjectsService.editProject, newProject);
  } catch (e) {
    console.log(e);
  }
}

function* projectSaga() {
  yield takeEvery(ProjectActionTypes.FETCH_PROJECTS, fetchProjects);
  yield takeEvery(ProjectActionTypes.DELETE_PROJECT, deleteProjects);
  yield takeEvery(
    ProjectActionTypes.TRIGGER_CREATE_NEW_PROJECT,
    createProjects,
  );
  yield takeEvery(ProjectActionTypes.TRIGGER_PATCH_PROJECT, patchProjects);
}

export { projectSaga };
