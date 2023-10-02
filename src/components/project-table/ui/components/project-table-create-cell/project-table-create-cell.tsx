import styles from "./project-table-create-cell.module.scss";
import { useAppDispatch } from "../../../../../shared";
import { Button } from "../../../../../ui/button";
import { SESSION_KEY_PROJECT } from "../../../../../shared/consts/storage";
import { ProjectActionTypes } from "../../../model";
import { Text } from "../../../../../ui/text";
import { Table } from "../../../../../ui/table";
import { Dispatch, SetStateAction } from "react";
import { ProjectType } from "../../../model/types/types";
import { Input } from "../../../../../ui/input";

interface ProjectTableCreateCellProps {
  className?: string;
  createProjectVisible: boolean;
  setCreatableProject: Dispatch<SetStateAction<ProjectType>>;
  setCreateProjectVisible: Dispatch<SetStateAction<boolean>>;
  creatableProject: ProjectType;
}

const ProjectTableCreateCell = (props: ProjectTableCreateCellProps) => {
  const {
    className,
    createProjectVisible,
    setCreatableProject,
    setCreateProjectVisible,
    creatableProject,
  } = props;
  const dispatch = useAppDispatch();

  return (
    <>
      {createProjectVisible && (
        <>
          <Table.Row className={styles.tableRowBody}>
            <Table.Cell className={styles.tableCellBody}>
              <Input
                placeholder={"Введите имя проекта"}
                value={creatableProject.name}
                onChange={(value) =>
                  setCreatableProject((prevState) => {
                    return {
                      ...prevState,
                      name: value,
                    };
                  })
                }
              />
            </Table.Cell>
            <Table.Cell className={styles.tableCellBody}>
              <Input
                placeholder={"Введите тип проекта"}
                value={creatableProject.type}
                onChange={(value) =>
                  setCreatableProject((prevState) => {
                    return {
                      ...prevState,
                      type: value,
                    };
                  })
                }
              />
            </Table.Cell>
          </Table.Row>
          <Table.Cell className={styles.tableCellBody}>
            {createProjectVisible &&
              (!!creatableProject.name && !!creatableProject.type ? (
                <Button
                  onClick={() => {
                    sessionStorage.setItem(
                      SESSION_KEY_PROJECT,
                      JSON.stringify(creatableProject),
                    );
                    dispatch({
                      type: ProjectActionTypes.TRIGGER_CREATE_NEW_PROJECT,
                    });
                    setCreatableProject({
                      name: "",
                      type: "",
                    });
                  }}
                  variant={"success"}
                  className={styles.addButton}
                >
                  <Text text={"Добавить"} />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setCreateProjectVisible(false);
                  }}
                  variant={"danger"}
                  className={styles.addButton}
                >
                  <Text text={"Отмена"} />
                </Button>
              ))}
          </Table.Cell>
        </>
      )}
    </>
  );
};

export { ProjectTableCreateCell };
