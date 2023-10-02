import { Table } from "../../../ui/table";
import style from "./project-table.module.scss";
import { classNames, useAppSelector } from "../../../shared";
import { ProjectType } from "../model/types/types";
import { useState } from "react";
import {
  ProjectTableBody,
  ProjectTableCreateCell,
  ProjectTableHeader,
} from "./components";
import { Skeleton } from "../../../ui/skeleton";

interface ProjectTableProps {
  className?: string;
  projects?: ProjectType[];
}

const ProjectTable = (props: ProjectTableProps) => {
  const { className } = props;
  const { data: projects, isLoading } = useAppSelector(
    (state) => state.projects,
  );
  const [createProjectVisible, setCreateProjectVisible] = useState(false);
  const [creatableProject, setCreatableProject] = useState<ProjectType>({
    name: "",
    type: "",
  });

  if (isLoading || !projects) {
    return (
      <Table
        customStyle={"style_projects"}
        className={classNames(style.table, {}, [className])}
        columnWidths={["auto", "auto", "36px"]}
      >
        <ProjectTableHeader
          createProjectVisible={createProjectVisible}
          setCreateProjectVisible={setCreateProjectVisible}
        />
        <Table.Row>
          <Table.Cell>
            <Skeleton width={"98%"} height={"100%"} />
          </Table.Cell>
          <Table.Cell>
            <Skeleton width={"96%"} height={"100%"} />
          </Table.Cell>
        </Table.Row>
      </Table>
    );
  }

  return (
    <Table
      customStyle={"style_projects"}
      className={classNames(style.table, {}, [className])}
      columnWidths={["auto", "auto", "36px"]}
    >
      <ProjectTableHeader
        createProjectVisible={createProjectVisible}
        setCreateProjectVisible={setCreateProjectVisible}
      />
      <ProjectTableBody projects={projects} />
      <ProjectTableCreateCell
        createProjectVisible={createProjectVisible}
        setCreatableProject={setCreatableProject}
        setCreateProjectVisible={setCreateProjectVisible}
        creatableProject={creatableProject}
      />
    </Table>
  );
};

export { ProjectTable };
