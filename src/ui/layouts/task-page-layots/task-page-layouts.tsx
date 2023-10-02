import styles from './task-page-layouts.module.scss';
import {classNames} from "../../../shared";
import {ReactNode} from "react";

interface TaskPageLayoutsProps {
  className?: string
  header: ReactNode
  content: ReactNode
}

const TaskPageLayouts = (props: TaskPageLayoutsProps) => {
  const {className, header, content} = props;

  return (
    <div className={classNames(styles.taskPageLayouts, {}, [className])}>
      <div className={styles.header}>{header}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export {TaskPageLayouts};
