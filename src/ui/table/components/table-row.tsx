import styles from '../coomon-style.module.scss';
import {classNames} from "../../../shared";
import {TableRowProps} from "../types";


const TableRow = (props: TableRowProps) => {
  const {className, children, onClick} = props;

  return (
    <div onClick={onClick} className={classNames(styles.tableRow, {}, [className])}>
      {children}
    </div>
  );
};

export {TableRow};
