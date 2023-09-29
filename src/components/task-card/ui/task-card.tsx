import styles from "./task-card.module.scss";
import {useDrag} from "react-dnd";
import {TaskType} from "../../../pages/task-page/model/types/task-schema";
import {TASK_DND_TYPE} from "../../../pages/task-page/model/consts";

const TaskCard = (props: {
  task: TaskType
}) => {
  const {task} = props

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
  return <div ref={drag} className={styles.taskCard}>{task.title ?? ''}</div>;
};

export {TaskCard};
