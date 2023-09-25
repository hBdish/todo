import { call, put, takeEvery } from "redux-saga/effects";

import { requestTasksSuccess } from "./task-actions";
import axios from "axios";
import { TaskActionTypes } from "../consts";
import { TaskType } from "../types";

const fetchAllTasks = async () => {
  const response = await axios.get("http://localhost:8000/tasks");
  return response.data;
}; // TODO mock

function* fetchTask() {
  try {
    const task: ResponseGenerator = yield call(fetchAllTasks);
    yield put(requestTasksSuccess(task as TaskType[]));
  } catch (e) {
    yield put({ type: TaskActionTypes.FETCH_TASKS_ERROR, error: e });
  }
}

function* mySaga() {
  yield takeEvery(TaskActionTypes.FETCH_TASKS, fetchTask);
}

export { mySaga };
