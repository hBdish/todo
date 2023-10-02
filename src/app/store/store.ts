import { applyMiddleware, combineReducers, createStore } from "redux"; // createStore использую осознанно, так как по ТЗ тулкит использовать запрещено
import createSagaMiddleware from "redux-saga";
import { tasksSaga, taskTableReducer } from "../../pages";
import { projectReducer, projectSaga } from "../../components";
import { taskReducer } from "../../components/task-card/model/slice/task-reducer";
import { searchReducer } from "../../components/search-filter/model/slice";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    projects: projectReducer,
    tasks: taskTableReducer,
    task: taskReducer,
    search: searchReducer,
  }),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(tasksSaga);
sagaMiddleware.run(projectSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
