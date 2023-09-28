import styles from "./task-card.module.scss";
import {useDrag} from "react-dnd";

const TaskCard = (props: { name: string }) => {
  const {name} = props

  const [{isDragging}, drag] = useDrag(() => ({
    type: 'task',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  return <div ref={drag} className={styles.taskCard}>{name}</div>;
};

export {TaskCard};
