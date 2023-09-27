import {Table} from "../../../ui/table";
import style from './project-table.module.scss'
import {Text} from "../../../ui/text";
import {classNames, getRouteTask} from "../../../shared";
import {ProjectType} from "../model/types/types";
import {useNavigate} from "react-router-dom";

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
      <Table.Row>
        <Table.HeaderCell><Text title={"Имя"}/></Table.HeaderCell>
        <Table.HeaderCell><Text title={"Тип"}/></Table.HeaderCell>
        <Table.HeaderCell/>
      </Table.Row>
      {projects.map(project => {
        return (<Table.Row onClick={() => navigate(getRouteTask(project.id))} key={project.id}>
          <Table.Cell>{project.name}</Table.Cell>
          <Table.Cell>
            {project.type}
          </Table.Cell>
          <button></button>
        </Table.Row>)
      })}

    </Table>
  );
};

export {ProjectTable};
