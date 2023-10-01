import {Table} from "../../../ui/table";
import style from './project-table.module.scss'
import {classNames, useAppSelector} from "../../../shared";
import {ProjectType} from "../model/types/types";
import {useState} from "react";
import {ProjectTableBody, ProjectTableCreateCell, ProjectTableHeader} from "./components";

interface ProjectTableProps {
  className?: string
  projects?: ProjectType[]
}

const ProjectTable = (props: ProjectTableProps) => {
  const {className} = props;
  const {data: projects} = useAppSelector((state) => state.projects);
  const [createProjectVisible, setCreateProjectVisible] = useState(false)
  const [creatableProject, setCreatableProject] = useState<ProjectType>(
    {
      name: '',
      type: '',
    }
  )

  if (!projects) {
    return <div>ERROR</div> // TODO переделать
  }

  return (
    <Table
      customStyle={"style_projects"}
      className={classNames(style.table, {}, [className])}
      columnWidths={['auto', 'auto', '36px']}
    >
      <ProjectTableHeader
        createProjectVisible={createProjectVisible}
        setCreateProjectVisible={setCreateProjectVisible}
      />
      <ProjectTableBody projects={projects}/>
      <ProjectTableCreateCell
        createProjectVisible={createProjectVisible}
        setCreatableProject={setCreatableProject}
        setCreateProjectVisible={setCreateProjectVisible}
        creatableProject={creatableProject}
      />
    </Table>
  );
};

export {ProjectTable};
