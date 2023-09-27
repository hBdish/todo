import styles from '../coomon-style.module.scss';
import {classNames} from "../../../shared";
import {TableHeaderCellProps} from "../types";


const TableHeaderCell = (props: TableHeaderCellProps) => {
  const {className, children} = props;

  return (
    <div className={classNames(styles.tableHeaderCell, {}, [className])}>
      {children}
    </div>
  );
};

export {TableHeaderCell};
