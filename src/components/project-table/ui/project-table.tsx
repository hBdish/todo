import {Table} from "../../../ui/table";
import style from './project-table.module.scss'
import {Text} from "../../../ui/text";
import {classNames, getRouteTask, MoreIcon} from "../../../shared";
import {ProjectType} from "../model/types/types";
import {useNavigate} from "react-router-dom";
import {AppImage} from "../../../ui/app-image";

interface ProjectTableProps {
  className?: string
  projects?: ProjectType[]
}

const ProjectTable = (props: ProjectTableProps) => {
  const {className, projects} = props;
  const navigate = useNavigate()

  if (!projects) {
    return <div>EMPTY</div> // TODO переделать
  }

  return (
    <Table className={classNames(style.table, {}, [className])} columnWidths={['auto', 'auto', '36px']}>
      <Table.Row className={style.tableRowHead}>
        <Table.HeaderCell className={style.tableCellHead}><Text title={"Имя"}/></Table.HeaderCell>
        <Table.HeaderCell className={style.tableCellHead}><Text title={"Тип"}/></Table.HeaderCell>
        <Table.HeaderCell className={style.tableCellHead}/>
      </Table.Row>
      {projects.map(project => {
        return (
          <Table.Row
            className={style.tableRowBody}
            onClick={() => navigate(getRouteTask(project.id))}
            key={project.id}
          >
            <Table.Cell className={style.tableCellBody}>
              {project.name}
            </Table.Cell>
            <Table.Cell className={style.tableCellBody}>
              {project.type}
            </Table.Cell>
            <Table.Cell className={style.tableCellBody}>
              <AppImage onClick={() => {
              }} style={{background: "transparent"}} src={MoreIcon}/>
            </Table.Cell>
          </Table.Row>
        )
      })}
    </Table>
  );
};

export {ProjectTable};
