import {applyMiddleware, combineReducers, createStore} from "redux"; // createStore использую осознанно, так как по ТЗ тулкит использовать запрещено
import createSagaMiddleware from "redux-saga";
import {taskReducer, tasksSaga} from "../../pages";
import {projectReducer, projectSaga} from "../../components";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    projects: projectReducer,
    tasks: taskReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(tasksSaga);
sagaMiddleware.run(projectSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
