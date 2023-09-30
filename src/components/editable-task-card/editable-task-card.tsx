import {Modal} from "../../ui/modal";
import styles from './editable-task-card.module.scss'
import {TaskType} from "../task-card/model/types/task-schema";
import {Table} from "../../ui/table";
import {Text} from "../../ui/text";
import {Input} from "../../ui/input";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../shared";
import {patchTask, setEditableTask} from "../task-card/model/slice/task-actions";

interface EditableTaskCardProps {
  isOpen: boolean;
  onClose: () => void;
  task?: TaskType
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
        <div className={styles.leftContent}>
          <Input
            value={editTask?.number}
            onChange={(value) => updateTaskData({number: value})}
            onBlur={() => {
              patchTaskData(editTask as TaskType)
            }}
          />
          <Input
            value={editTask?.title}
            onChange={(value) => updateTaskData({title: value})}
            onBlur={() => {
              patchTaskData(editTask as TaskType)
            }}
          />
          <Input
            onBlur={() => {
              patchTaskData(editTask as TaskType)
            }}
            label={'Описание'}
            placeholder={'Редактировать описание'}
            onChange={(value) => updateTaskData({description: value})}
            value={editTask?.description}
          />
          <div className={styles.commentBlock}></div>
        </div>
        <Table columnWidths={['100%']} className={styles.rightContent}>
          <Table.HeaderCell>
            <Text title={'Сведения'} bold/>
          </Table.HeaderCell>

          <Table.Cell>
            <Input label={'Приоритет'} value={editTask?.priority}/>
          </Table.Cell>
          <Table.Cell>
            <Input label={'Время в работе'} value={editTask?.timeInWork}/>
          </Table.Cell>
          <Table.Cell>
            <Input label={'Дата создания'} value={editTask?.dateCreated}/>
          </Table.Cell>
          <Table.Cell>
            <Input label={'Дата завершения'} value={editTask?.dateCompleted}/>
          </Table.Cell>
        </Table>
      </div>
    </Modal>
  );
};

export {EditableTaskCard};
