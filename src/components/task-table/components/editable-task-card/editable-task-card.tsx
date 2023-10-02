import {Modal} from "../../../../ui/modal";
import styles from './editable-task-card.module.scss'
import {TaskType} from "../../../task-card/model/types/task-schema";
import {Text} from "../../../../ui/text";
import {Input} from "../../../../ui/input";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../../../shared";
import {patchTask, setEditableTask} from "../../../task-card/model/slice/task-actions";
import {Vstack} from "../../../../ui/stack";
import {Textarea} from "../../../../ui/textarea";


interface EditableTaskCardProps {
  isOpen: boolean;
  onClose: () => void;
  task?: TaskType
}

const calcDayInWork = (startDay: string) => {
  const start = new Date(startDay).getTime()

  const daysInMs = Date.now() - start

  return Math.ceil(daysInMs / 86400000);
}

const EditableTaskCard = (props: EditableTaskCardProps) => {
  const {onClose, isOpen, task} = props;
  const [editTask, setEditTask] = useState<TaskType>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!task) return
    setEditTask(task)

  }, [task]);

  const updateTaskData = (editTask: TaskType) => {
    setEditTask(prevState => {
      return {...prevState, ...editTask}
    })
  }

  const patchTaskData = (editTask: TaskType) => {
    dispatch(setEditableTask(editTask))
    dispatch(patchTask(editTask))
  }

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className={styles.modal}>
        <Vstack w100 className={styles.leftContent}>
          <Input
            readonly
            value={editTask?.number}
          />
          <Input
            label={'Название'}
            value={editTask?.title}
            onChange={(value) => updateTaskData({title: value})}
            onBlur={() => {
              if (task?.title !== editTask?.title) patchTaskData(editTask as TaskType)
            }}
          />
        
          <Textarea
            onBlur={() => {
              if (task?.description !== editTask?.description) patchTaskData(editTask as TaskType)
            }}
            label={'Описание'}
            placeholder={'Редактировать описание'}
            onChange={(value) => updateTaskData({description: value})}
            value={editTask?.description}
          />
          <div className={styles.commentBlock}>
          </div>
        </Vstack>
        <Vstack
          w100
          gap={"8"}
          className={styles.rightContent}>
          <Text
            title={'Сведения'}
            bold/>
          <Input
            label={'Приоритет'}
            value={editTask?.priority}/>
          <Input
            label={'Дней в работе'}
            value={calcDayInWork(editTask?.dateCreated ?? '')}/>
          <Input
            type={"date"}
            label={'Дата создания'}
            value={editTask?.dateCreated}
          />
          <Input
            type={"date"}
            label={'Дата завершения'}
            value={editTask?.dateCompleted}
            onChange={(value) => updateTaskData({dateCompleted: value})}
            onBlur={() => {
              if (task?.dateCompleted !== editTask?.dateCompleted) patchTaskData(editTask as TaskType)
            }}
          />
        </Vstack>
      </div>
    </Modal>
  );
};

export {EditableTaskCard};
