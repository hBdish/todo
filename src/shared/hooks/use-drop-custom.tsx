import { useAppDispatch } from "./use-redux";
import { useDrop } from "react-dnd";
import { TASK_DND_TYPE, TaskActionTypes } from "../../components";
import {
  TaskStatus,
  TaskType,
} from "../../components/task-card/model/types/task-schema";
import {
  moveTaskOnTheTable,
  setNewTaskStatus,
} from "../../components/task-table/model/slice/task-table-actions";

export const useDropCustom = (status: TaskStatus) => {
  const dispatch = useAppDispatch();

  const [{ isOverDone }, dropDone] = useDrop(
    () => ({
      accept: TASK_DND_TYPE,
      drop: (task) => {
        const newTask = task as {
          type: string;
          task: TaskType;
        };
        dispatch(moveTaskOnTheTable({ task: newTask.task, keySet: status }));
        dispatch(setNewTaskStatus(newTask.task, status));
        dispatch({ type: TaskActionTypes.PATCH_TASK });
      },
      collect: (monitor) => ({
        isOverDone: !!monitor.isOver(),
      }),
    }),
    [],
  );

  return [dropDone];
};
