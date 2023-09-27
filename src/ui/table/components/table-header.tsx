import styles from '../coomon-style.module.scss';
import {classNames} from "../../../shared";
import {TableHeaderProps} from "../types";


const TableHeader = (props: TableHeaderProps) => {
  const {className, children} = props;

  return (
    <h4 className={classNames(styles.tableHeader, {}, [className])}>
      {children}
    </h4>
  );
};

export {TableHeader};
