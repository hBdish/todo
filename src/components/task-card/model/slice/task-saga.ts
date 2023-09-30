import {call, put, select, takeEvery} from "redux-saga/effects";
import {requestTasksSuccess} from "./task-actions";
import {TasksActionTypes} from "../../../task-table/model/consts";

import {TasksService} from "../../../../shared";
import {StateSchema} from "../../../../app/store";
import {TaskType} from "../types/task-schema";
import {TaskActionTypes} from "../../../index";

function* fetchTask() {
  const id: string = yield select(
    (state: StateSchema) => state.projects.selectedProjectId
  );

  try {
    const task: TaskType[] = yield call(TasksService.fetchAllTasks, id);
    yield put(requestTasksSuccess(task));
  } catch (e) {
    yield put({type: TasksActionTypes.FETCH_TASKS_ERROR, error: e});
  }
}

function* editTask() {
  const newTask: TaskType = yield select(
    (state: StateSchema) => state.task.editableTask
  );

  try {
    yield call(TasksService.editTask, newTask);

  } catch (e) {
    console.log(e)
  }
}

function* tasksSaga() {
  yield takeEvery(TasksActionTypes.FETCH_TASKS, fetchTask);
  yield takeEvery(TaskActionTypes.PATCH_TASK, editTask);
}

export {tasksSaga};
