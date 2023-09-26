import { call, put, takeEvery } from "redux-saga/effects";
import { requestTasksSuccess } from "./task-actions";
import { TaskActionTypes } from "../consts";
import { TaskType } from "../types";
import { TasksService } from "../../../../api/api";

function* fetchTask() {
  try {
    const task: TaskType[] = yield call(TasksService.fetchAllTasks);
    yield put(requestTasksSuccess(task));
  } catch (e) {
    yield put({ type: TaskActionTypes.FETCH_TASKS_ERROR, error: e });
  }
}

function* mySaga() {
  yield takeEvery(TaskActionTypes.FETCH_TASKS, fetchTask);
}

export { mySaga };
