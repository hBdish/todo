import {getRouteTask, useAppDispatch} from "../../../../../shared";
import {Table} from "../../../../../ui/table";
import styles from "./project-table-body.module.scss";
import {Input} from "../../../../../ui/input";
import {Popover} from "../../../../../ui/popover";
import {Button} from "../../../../../ui/button";
import {ProjectActionTypes, setSelectedProjectId} from "../../../model";
import {ProjectType} from "../../../model/types/types";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {SESSION_KEY_PROJECT} from "../../../../../shared/consts/storage";

interface ProjectTableBodyProps {
  projects: ProjectType[]
}

const ProjectTableBody = (props: ProjectTableBodyProps) => {
  const {projects} = props;
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [editableProject, setEditableProject] = useState<ProjectType>(
    {}
  )

  useEffect(() => {
    dispatch({type: ProjectActionTypes.PATCH_PROJECT, payload: editableProject})
    sessionStorage.setItem(SESSION_KEY_PROJECT, JSON.stringify(editableProject))
  }, [editableProject]);


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
                onChange={value => {
                  setEditableProject(prevState => {
                    return {
                      ...prevState,
                      id: project.id,
                      type: project.type,
                      name: value
                    }
                  })
                }}
                onBlur={() => {
                  dispatch({type: ProjectActionTypes.TRIGGER_PATCH_PROJECT})
                }}
              />
            </Table.Cell>
            <Table.Cell className={styles.tableCellBody}>
              <Input
                onChange={value => setEditableProject(prevState => {
                  return {
                    ...prevState,
                    id: project.id,
                    name: project.name,
                    type: value
                  }
                })}
                onClick={(e) => e.stopPropagation()}
                value={project.type}
                onBlur={() => {
                  dispatch({type: ProjectActionTypes.TRIGGER_PATCH_PROJECT})
                }}
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
