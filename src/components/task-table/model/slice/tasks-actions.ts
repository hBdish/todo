import {TasksSyncActionTypes} from "../consts";
import {TasksMoveType} from "../types";

export const tasksMove = (payload: TasksMoveType) => {
  return {type: TasksSyncActionTypes.MOVE_TASK, payload};
};
