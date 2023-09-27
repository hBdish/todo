import {call, put, select, takeEvery} from "redux-saga/effects";
import {requestTasksSuccess} from "./task-actions";
import {TaskActionTypes} from "../consts";
import {TaskType} from "../types";
import {TasksService} from "../../../../shared/api/api";
import {StateSchema} from "../../../../app/store";

function* fetchTask() {
  const id: string = yield select(
    (state: StateSchema) => state.projects.selectedProjectId
  );

  try {
    const task: TaskType[] = yield call(TasksService.fetchAllTasks, id);
    yield put(requestTasksSuccess(task));
  } catch (e) {
    yield put({type: TaskActionTypes.FETCH_TASKS_ERROR, error: e});
  }
}

function* tasksSaga() {
  yield takeEvery(TaskActionTypes.FETCH_TASKS, fetchTask);
}

export {tasksSaga};
