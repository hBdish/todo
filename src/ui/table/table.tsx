import styles from './coomon-style.module.scss';
import {classNames} from "../../shared";
import {CSSProperties, FC} from "react";
import {TableProps, TableSubcomponents} from "./types";
import {TableCell, TableHeader, TableHeaderCell, TableRow} from "./components";

const Table: FC<TableProps> & TableSubcomponents = (props: TableProps) => {
  const {className, columnWidths, children} = props;
  const style: CSSProperties = {gridTemplateColumns: columnWidths.join(' ')}

  return (
    <div className={classNames(styles.table, {}, [className])} style={style}>
      {children}
    </div>
  );
};

Table.Header = TableHeader
Table.Row = TableRow
Table.Cell = TableCell
Table.HeaderCell = TableHeaderCell

export {Table};
