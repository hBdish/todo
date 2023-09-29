import {TableRow} from "../../ui/table/components";
import {Table} from "../../ui/table";
import {useAppDispatch, useAppSelector} from "../../shared";
import {tasksMove} from "../../pages/task-page/model/slice/tasks-actions";
import {TASK_DND_TYPE, TaskActionTypes, TaskSyncActionTypes} from "../../pages/task-page/model/consts";
import {TaskType} from "../../pages/task-page/model/types/task-schema";
import {useDrop} from "react-dnd";
import {TaskCard} from "../task-card";
import styles from './task-table.module.scss'

interface TaskTableProps {
  className?: string
}

const TaskTable = (props: TaskTableProps) => {
  const {className} = props;
  const dispatch = useAppDispatch()
  const {allMap} = useAppSelector((state) => state.tasks);

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
    <Table columnWidths={['auto', 'auto', 'auto']}>
      <TableRow>
        <Table.HeaderCell>Queue</Table.HeaderCell>
        <Table.HeaderCell>Development</Table.HeaderCell>
        <Table.HeaderCell>Done</Table.HeaderCell>
      </TableRow>
      <Table.Row>
        <Table.Cell myRef={dropQueue} className={styles.taskTableCell}>
          {Array.from(allMap!.get("Queue")!.values())?.map(task =>
            <TaskCard key={task.id} task={task}></TaskCard>
          )}
        </Table.Cell>
        <Table.Cell myRef={dropDevelopment} className={styles.taskTableCell}>
          {Array.from(allMap!.get("Development")!.values())?.map(task =>
            <TaskCard key={task.id} task={task}></TaskCard>
          )}
        </Table.Cell>
        <Table.Cell myRef={dropDone} className={styles.taskTableCell}>
          {Array.from(allMap!.get("Done")!.values())?.map(task =>
            <TaskCard key={task.id} task={task}></TaskCard>
          )}
        </Table.Cell>
      </Table.Row>
    </Table>
  );
};

export {TaskTable};
