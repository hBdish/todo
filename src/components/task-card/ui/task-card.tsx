import styles from "./task-card.module.scss";
import {useDrag} from "react-dnd";
import {TaskType} from "../model/types/task-schema";
import {CSSProperties} from "react";
import {TASK_DND_TYPE} from "../model/consts/consts";
import {Text} from "../../../ui/text";

const TaskCard = (props: {
  task: TaskType
  style?: CSSProperties
  onClick?: () => void
}) => {
  const {task, style, onClick} = props


  const [{isDragging}, drag] = useDrag(() => ({
    item: {
      type: TASK_DND_TYPE,
      task
    },
    type: TASK_DND_TYPE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  return (
    <div
      style={style}
      ref={drag}
      className={styles.taskCard}
      onClick={onClick}
    >
      <Text
        title={task.title ?? ''}
        text={`Номер задачи: ${task.number?.toString() ?? ""}`}
      />

    </div>
  );
};

export {TaskCard};
