import styles from "./task-card.module.scss";
import { useDrag } from "react-dnd";
import { TaskType } from "../model/types/task-schema";
import { CSSProperties } from "react";
import { TASK_DND_TYPE, TaskActionTypes } from "../model/consts/consts";
import { Text } from "../../../ui/text";
import { classNames, useAppDispatch } from "../../../shared";
import { Hstack } from "../../../ui/stack";
import { Popover } from "../../../ui/popover";
import { Button } from "../../../ui/button";
import { setEditableTask } from "../model/slice/task-actions";

const TaskCard = (props: {
  task: TaskType;
  style?: CSSProperties;
  onClick?: () => void;
  className?: string;
}) => {
  const { task, style, onClick, className } = props;
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    item: {
      type: TASK_DND_TYPE,
      task,
    },
    type: TASK_DND_TYPE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      style={style}
      ref={drag}
      className={classNames(styles.taskCard, {}, [className])}
      onClick={onClick}
    >
      <Hstack w100 align={"center"} justify={"between"}>
        <Text
          title={task.title ?? ""}
          text={`Номер задачи: ${task.number?.toString() ?? ""}`}
        />
        <Popover className={styles.popover}>
          <Button
            onClick={() => {
              dispatch(setEditableTask(task));
              dispatch({
                type: TaskActionTypes.DELETE_TASK,
                payload: task.id ?? "",
              });
            }}
          >
            Удалить
          </Button>
        </Popover>
      </Hstack>
    </div>
  );
};

export { TaskCard };
