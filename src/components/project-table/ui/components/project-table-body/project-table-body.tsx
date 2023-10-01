import {getRouteTask, useAppDispatch} from "../../../../../shared";
import {Table} from "../../../../../ui/table";
import styles from "./project-table-body.module.scss";
import {Input} from "../../../../../ui/input";
import {Popover} from "../../../../../ui/popover";
import {Button} from "../../../../../ui/button";
import {ProjectActionTypes, setSelectedProjectId} from "../../../model";
import {ProjectType} from "../../../model/types/types";
import {useNavigate} from "react-router-dom";

interface ProjectTableBodyProps {
  projects: ProjectType[]
}

const ProjectTableBody = (props: ProjectTableBodyProps) => {
  const {projects} = props;
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <>
      {projects.map(project => {
        return (
          <Table.Row
            className={styles.tableRowBody}
            onClick={() => navigate(getRouteTask(project.id ?? ''))}
            key={project.id}
          >
            <Table.Cell className={styles.tableCellBody}>
              <Input
                onClick={(e) => e.stopPropagation()}
                value={project.name}
              />
            </Table.Cell>
            <Table.Cell className={styles.tableCellBody}>
              <Input
                onClick={(e) => e.stopPropagation()}
                value={project.type}
              />
            </Table.Cell>
            <Table.Cell className={styles.tableCellBody}>
              <Popover positionRight>
                <Button onClick={(event) => {
                  dispatch(setSelectedProjectId(project.id ?? ''))
                  dispatch({type: ProjectActionTypes.DELETE_PROJECT})
                }}>Удалить</Button>
              </Popover>
            </Table.Cell>
          </Table.Row>
        )
      })}
    </>
  );
};

export {ProjectTableBody};
