import styles from "./project-table-header.module.scss";
import { classNames } from "../../../../../shared";
import { Table } from "../../../../../ui/table";
import { Text } from "../../../../../ui/text";
import { Button } from "../../../../../ui/button";
import React, { Dispatch, SetStateAction } from "react";

interface ProjectTableHeaderProps {
  className?: string;
  createProjectVisible: boolean;
  setCreateProjectVisible: Dispatch<SetStateAction<boolean>>;
}

const ProjectTableHeader = (props: ProjectTableHeaderProps) => {
  const { className, createProjectVisible, setCreateProjectVisible } = props;

  return (
    <Table.Row className={classNames(styles.tableRowHead, {}, [className])}>
      <Table.HeaderCell className={styles.tableCellHead}>
        <Text title={"Имя"} />
      </Table.HeaderCell>
      <Table.HeaderCell className={styles.tableCellHead}>
        <Text title={"Тип"} />
      </Table.HeaderCell>
      <Table.HeaderCell className={styles.tableCellHead}>
        {!createProjectVisible && (
          <Button
            onClick={() => {
              setCreateProjectVisible(true);
            }}
            variant={"primary"}
            className={styles.addButton}
          >
            <Text text={"Добавить"} />
          </Button>
        )}
      </Table.HeaderCell>
    </Table.Row>
  );
};

export { ProjectTableHeader };
