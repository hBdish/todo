import { applyMiddleware, combineReducers, createStore } from "redux"; // createStore использую осознанно, так как по ТЗ тулкит использовать запрещено
import createSagaMiddleware from "redux-saga";
import { mySaga, taskReducer } from "../../pages";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    tasks: taskReducer,
  }),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(mySaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
