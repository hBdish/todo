import styles from '../coomon-style.module.scss';
import {classNames} from "../../../shared";
import {TableCellProps} from "../types";


const TableCell = (props: TableCellProps) => {
  const {className, children} = props;

  return (
    <div className={classNames(styles.tableCell, {}, [className])}>
      {children}
    </div>
  );
};

export {TableCell};
