import {TableRow} from "../../ui/table/components";
import {Table} from "../../ui/table";
import {useAppDispatch, useAppSelector} from "../../shared";
import {tasksMove} from "./model/slice/tasks-actions";
import {TaskType} from "../task-card/model/types/task-schema";
import {useDrop} from "react-dnd";
import {TASK_DND_TYPE, TaskActionTypes, TaskCard, TaskSyncActionTypes} from "../task-card";
import styles from './task-table.module.scss'
import {Text} from "../../ui/text";
import {EditableTaskCard} from "../editable-task-card/editable-task-card";
import {useCallback, useState} from "react";

interface TaskTableProps {
  className?: string
}

const TaskTable = (props: TaskTableProps) => {
  const {className} = props;
  const dispatch = useAppDispatch()
  const {allMap} = useAppSelector((state) => state.tasks);
  const [isEditTaskModal, setIsTaskModal] = useState(false);
  const onToggleTaskModal = useCallback(() => {
    setIsTaskModal((prevState) => !prevState);
  }, []);
  const [editableTask, setEditableTask] = useState<TaskType | undefined>()


  const [collectedProps, dropQueue] = useDrop(
    () => ({
      accept: TASK_DND_TYPE,
      options: {
        cell: "Queue"
      },
      drop: (task) => {
        const newTask = task as {
          type: string,
          task: TaskType
        }
        dispatch(tasksMove({task: newTask.task, keySet: "Queue"}))
        dispatch({type: TaskSyncActionTypes.SET_EDITABLE_TASK, payload: {...newTask.task, status: "Queue"}})
        dispatch({type: TaskActionTypes.PATCH_TASK})
      },
      collect: (monitor) => ({
        isOverQueue: !!monitor.isOver()
      }),

    }),
    []
  )

  const [{isOverDevelopment}, dropDevelopment] = useDrop(
    () => ({
      accept: TASK_DND_TYPE,
      drop: (task) => {
        const newTask = task as {
          type: string,
          task: TaskType
        }
        dispatch(tasksMove({task: newTask.task, keySet: "Development"}))
        dispatch({type: TaskSyncActionTypes.SET_EDITABLE_TASK, payload: {...newTask.task, status: "Development"}})
        dispatch({type: TaskActionTypes.PATCH_TASK})
      },
      collect: (monitor) => ({
        isOverDevelopment: !!monitor.isOver()
      })
    }),
    []
  )

  const [{isOverDone}, dropDone] = useDrop(
    () => ({
      accept: TASK_DND_TYPE,
      drop: (task) => {
        const newTask = task as {
          type: string,
          task: TaskType
        }
        dispatch(tasksMove({task: newTask.task, keySet: "Done"}))
        dispatch({type: TaskSyncActionTypes.SET_EDITABLE_TASK, payload: {...newTask.task, status: "Done"}})
        dispatch({type: TaskActionTypes.PATCH_TASK})
      },
      collect: (monitor) => ({
        isOverDone: !!monitor.isOver()
      })
    }),
    []
  )

  return (
    <>
      <Table columnWidths={['auto', 'auto', 'auto']}>
        <TableRow>
          <Table.HeaderCell className={styles.taskTableCellHeader}>
            <Text
              title={"Queue"}
              style={{background: "#9FADBC", color: "#42526E", padding: "2px"}}
              bold
              size={"size_s"}
            />
          </Table.HeaderCell>
          <Table.HeaderCell className={styles.taskTableCellHeader}>
            <Text
              title={"Development"}
              style={{background: "#85B8FF", color: "#0052CC", padding: "2px"}}
              bold
              size={"size_s"}
            />
          </Table.HeaderCell>
          <Table.HeaderCell className={styles.taskTableCellHeader}>
            <Text
              title={"Done"}
              style={{background: "#7EE2B8", color: "#006644", padding: "2px"}}
              bold
              size={"size_s"}
            />
          </Table.HeaderCell>
        </TableRow>
        <Table.Row>
          <Table.Cell myRef={dropQueue} className={styles.taskTableCell}>
            {Array.from(allMap!.get("Queue")!.values())?.map(task =>
              <TaskCard
                onClick={() => {
                  setEditableTask(task)
                  onToggleTaskModal()
                }}
                key={task.id}
                task={task}></TaskCard>
            )}
          </Table.Cell>
          <Table.Cell myRef={dropDevelopment} className={styles.taskTableCell}>
            {Array.from(allMap!.get("Development")!.values())?.map(task =>
              <TaskCard
                onClick={() => {
                  setEditableTask(task)
                  onToggleTaskModal()
                }}
                key={task.id} task={task}></TaskCard>
            )}
          </Table.Cell>
          <Table.Cell
            myRef={dropDone} className={styles.taskTableCell}>
            {Array.from(allMap!.get("Done")!.values())?.map(task =>
              <TaskCard
                onClick={() => {
                  setEditableTask(task)
                  onToggleTaskModal()
                }}
                key={task.id}
                task={task}></TaskCard>
            )}
          </Table.Cell>
        </Table.Row>
      </Table>
      <EditableTaskCard task={editableTask} isOpen={isEditTaskModal} onClose={onToggleTaskModal}/></>
  );
};

export {TaskTable};
