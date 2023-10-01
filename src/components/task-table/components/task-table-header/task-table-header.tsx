import styles from './task-table-header.module.scss';
import {classNames} from "../../../../shared";
import {TableRow} from "../../../../ui/table/components";
import {Table} from "../../../../ui/table";
import {Text} from "../../../../ui/text";

interface TaskTableHeaderProps {
  className?: string
}

const TaskTableHeader = (props: TaskTableHeaderProps) => {
  const {className} = props;

  return (
    <TableRow>
      <Table.HeaderCell className={classNames(styles.taskTableCellHeader, {}, [className])}>
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
  );
};

export {TaskTableHeader};
