import { call, put, select, takeEvery } from "redux-saga/effects";
import { requestTasksSuccess } from "./task-actions";
import { TaskTableActionTypes } from "../../../task-table/model/consts";

import { TasksService } from "../../../../shared";
import { StateSchema } from "../../../../app/store";
import { TaskType } from "../types/task-schema";
import { TaskActionTypes, TaskSyncActionTypes } from "../../../index";

function* fetchTask() {
  const id: string = yield select(
    (state: StateSchema) => state.projects.selectedProjectId,
  );

  const search: string = yield select(
    (state: StateSchema) => state.search.search,
  );

  try {
    const task: TaskType[] = yield call(TasksService.fetchAllTasks, {
      projectId: id,
      search: search,
    });
    yield put(requestTasksSuccess(task));
  } catch (e) {
    yield put({ type: TaskTableActionTypes.FETCH_TASKS_ERROR, error: e });
  }
}

function* editTask() {
  const newTask: TaskType = yield select(
    (state: StateSchema) => state.task.editableTask,
  );

  try {
    const task: TaskType = yield call(TasksService.editTask, newTask);
    yield put({ type: TaskSyncActionTypes.SET_TASK, payload: task });
  } catch (e) {
    console.log(e);
  }
}

function* createTask() {
  const newTask: TaskType = yield select(
    (state: StateSchema) => state.task.editableTask,
  );
  const date = new Date(Date.now())
    .toLocaleDateString()
    .split(".")
    .reverse()
    .join("-");
  try {
    const task: TaskType = yield call(TasksService.createTask, newTask);
    yield put({
      type: TaskTableActionTypes.PUSH_NEW_TASK,
      payload: {
        ...task,
        date,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

function* deleteTask() {
  const taskId: string = yield select(
    (state: StateSchema) => state.task.editableTask?.id ?? "",
  );

  try {
    yield call(TasksService.deleteTaskById, taskId);
    yield put({ type: TaskTableActionTypes.DELETE_SYNC_TASK, payload: taskId });
  } catch (e) {
    console.log(e);
  }
}

function* tasksSaga() {
  yield takeEvery(TaskTableActionTypes.FETCH_TASKS, fetchTask);
  yield takeEvery(TaskActionTypes.PATCH_TASK, editTask);
  yield takeEvery(TaskActionTypes.CREATE_TASK, createTask);
  yield takeEvery(TaskActionTypes.DELETE_TASK, deleteTask);
}

export { tasksSaga };
