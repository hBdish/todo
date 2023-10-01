import {Table} from "../../../ui/table";
import style from './project-table.module.scss'
import {Text} from "../../../ui/text";
import {classNames, getRouteTask, useAppDispatch, useAppSelector} from "../../../shared";
import {ProjectType} from "../model/types/types";
import {useNavigate} from "react-router-dom";
import {Button} from "../../../ui/button";
import {ProjectActionTypes, setSelectedProjectId} from "../model";
import {Popover} from "../../../ui/popover";
import {Input} from "../../../ui/input";
import {SESSION_KEY_PROJECT} from "../../../shared/consts/storage";
import {useState} from "react";

interface ProjectTableProps {
  className?: string
  projects?: ProjectType[]
}

const ProjectTable = (props: ProjectTableProps) => {
  const {className} = props;
  const {data: projects} = useAppSelector((state) => state.projects);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [createProjectVisible, setCreateProjectVisible] = useState(false)
  const [creatableProject, setCreatableProject] = useState<ProjectType>(
    {
      name: '',
      type: '',
    }
  )


  if (!projects) {
    return <div>EMPTY</div> // TODO переделать
  }

  return (
    <Table customStyle={"style_projects"} className={classNames(style.table, {}, [className])}
           columnWidths={['auto', 'auto', '36px']}>
      <Table.Row className={style.tableRowHead}>
        <Table.HeaderCell className={style.tableCellHead}><Text title={"Имя"}/></Table.HeaderCell>
        <Table.HeaderCell className={style.tableCellHead}><Text title={"Тип"}/></Table.HeaderCell>
        <Table.HeaderCell className={style.tableCellHead}>
          {!createProjectVisible && <Button
            onClick={() => {
              setCreateProjectVisible(true)
              sessionStorage.setItem(SESSION_KEY_PROJECT, JSON.stringify({name: 'asd'}))
            }}
            variant={"primary"}
            className={style.addButton}
          >
            <Text text={'Добавить'}/>
          </Button>}
        </Table.HeaderCell>
      </Table.Row>
      {projects.map(project => {
        return (
          <Table.Row
            className={style.tableRowBody}
            onClick={() => navigate(getRouteTask(project.id ?? ''))}
            key={project.id}
          >
            <Table.Cell className={style.tableCellBody}>
              <Input
                onClick={(e) => e.stopPropagation()}
                value={project.name}
              />
            </Table.Cell>
            <Table.Cell className={style.tableCellBody}>
              <Input
                onClick={(e) => e.stopPropagation()}
                value={project.type}
              />
            </Table.Cell>
            <Table.Cell className={style.tableCellBody}>
              <Popover>
                <Button onClick={(event) => {
                  dispatch(setSelectedProjectId(project.id ?? ''))
                  dispatch({type: ProjectActionTypes.DELETE_PROJECT})
                }}>Удалить</Button>
              </Popover>
            </Table.Cell>
          </Table.Row>
        )
      })}
      {createProjectVisible && (
        <>
          <Table.Row
            className={style.tableRowBody}
          >
            <Table.Cell className={style.tableCellBody}>
              <Input
                placeholder={"Введите имя проекта"}
                value={creatableProject.name}
                onChange={value => setCreatableProject(prevState => {
                  return {
                    ...prevState,
                    name: value
                  }
                })}
              />
            </Table.Cell>
            <Table.Cell className={style.tableCellBody}>
              <Input
                placeholder={"Введите тип проекта"}
                value={creatableProject.type}
                onChange={value => setCreatableProject(prevState => {
                  return {
                    ...prevState,
                    type: value
                  }
                })}
              />
            </Table.Cell>
            <Table.Cell className={style.tableCellBody}>
              {createProjectVisible &&
                (
                  !!creatableProject.name && !!creatableProject.type ?
                    <Button
                      onClick={() => {
                        sessionStorage.setItem(SESSION_KEY_PROJECT, JSON.stringify(creatableProject))
                        dispatch({type: ProjectActionTypes.TRIGGER_CREATE_NEW_PROJECT})
                        setCreatableProject({
                          name: '',
                          type: '',
                        })
                      }}
                      variant={"success"}
                      className={style.addButton}>
                      <Text text={'Добавить'}/>
                    </Button>
                    :
                    <Button
                      onClick={() => {
                        setCreateProjectVisible(false)
                      }}
                      variant={"danger"}
                      className={style.addButton}>
                      <Text text={'Отмена'}/>
                    </Button>
                )
              }
            </Table.Cell>
          </Table.Row>
        </>
      )}
    </Table>
  );
};

export {ProjectTable};
