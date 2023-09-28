import styles from './task-table.module.scss';
import {TableCell, TableRow} from "../../ui/table/components";
import {Table} from "../../ui/table";
import {useAppSelector} from "../../shared";
import {TaskCard} from "../task-card";

interface TaskTableProps {
  className?: string
}


const TaskTable = (props: TaskTableProps) => {
  const {className} = props;
  const {doneTasks, queueTasks, developmentTasks} = useAppSelector((state) => state.tasks);


  return (
    <Table columnWidths={['auto', 'auto', 'auto']}>
      <TableRow>
        <Table.HeaderCell>Queue</Table.HeaderCell>
        <Table.HeaderCell>Development</Table.HeaderCell>
        <Table.HeaderCell>Done</Table.HeaderCell>
      </TableRow>
      <Table.Row>
        <TableCell className={styles.taskTableCell}>
          {Array.from(queueTasks!.values())?.map(task =>
            <TaskCard key={task.id} name={task.title}></TaskCard>
          )}
        </TableCell>
        <TableCell className={styles.taskTableCell}>
          {Array.from(developmentTasks!.values())?.map(task =>
            <TaskCard key={task.id} name={task.title}></TaskCard>
          )}
        </TableCell>
        <TableCell className={styles.taskTableCell}>
          {Array.from(doneTasks!.values())?.map(task =>
            <TaskCard key={task.id} name={task.title}></TaskCard>
          )}
        </TableCell>
      </Table.Row>
    </Table>
  );
};

export {TaskTable};
