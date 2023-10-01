import {Table} from "../../ui/table";
import {useAppSelector, useDropCustom} from "../../shared";
import {TaskType} from "../task-card/model/types/task-schema";
import {TaskCard} from "../task-card";
import styles from './task-table.module.scss'
import {EditableTaskCard} from "./components/editable-task-card/editable-task-card";
import {useCallback, useState} from "react";
import {TaskTableHeader} from "./components/task-table-header";
import {CreateButton} from "./components";


const TaskTable = () => {
  const {allMap} = useAppSelector((state) => state.tasks);
  const [isEditTaskModal, setIsTaskModal] = useState(false);
  const onToggleTaskModal = useCallback(() => {
    setIsTaskModal((prevState) => !prevState);
  }, []);
  const [editableTask, setEditableTask] = useState<TaskType | undefined>()
  const [isCreate, setIsCreate] = useState(false)


  const [dropQueue] = useDropCustom("Queue")
  const [dropDevelopment] = useDropCustom("Development")
  const [dropDone] = useDropCustom("Done")

  const renderTaskCard = (task: TaskType) => (
    <TaskCard
      className={styles.taskCard}
      onClick={() => {
        setEditableTask(task)
        onToggleTaskModal()
      }}
      key={task.id}
      task={task}
    />
  )


  return (
    <>
      <Table columnWidths={['auto', 'auto', 'auto']}>
        <TaskTableHeader/>
        <Table.Row>
          <Table.Cell myRef={dropQueue} className={styles.taskTableCell}>
            {Array.from(allMap!.get("Queue")!.values())?.map(task =>
              renderTaskCard(task)
            )}
            <CreateButton isCreate={isCreate} setIsCreate={setIsCreate}/>
          </Table.Cell>
          <Table.Cell myRef={dropDevelopment} className={styles.taskTableCell}>
            {Array.from(allMap!.get("Development")!.values())?.map(task =>
              renderTaskCard(task)
            )}
          </Table.Cell>
          <Table.Cell
            myRef={dropDone} className={styles.taskTableCell}>
            {Array.from(allMap!.get("Done")!.values())?.map(task =>
              renderTaskCard(task)
            )}
          </Table.Cell>
        </Table.Row>
      </Table>
      <EditableTaskCard task={editableTask} isOpen={isEditTaskModal} onClose={onToggleTaskModal}/></>
  );
};

export {TaskTable};
