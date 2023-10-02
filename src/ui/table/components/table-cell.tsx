import styles from "../coomon-style.module.scss";
import { classNames } from "../../../shared";
import { TableCellProps } from "../types";
import { LegacyRef } from "react";

const TableCell = (
  props: TableCellProps & {
    myRef?: LegacyRef<any>;
  },
) => {
  const { className, children, myRef } = props;

  return (
    <div ref={myRef} className={classNames(styles.tableCell, {}, [className])}>
      {children}
    </div>
  );
};

export { TableCell };
