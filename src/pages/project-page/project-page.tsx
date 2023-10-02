import { ProjectActionTypes, ProjectTable } from "../../components";
import { useAppDispatch } from "../../shared";
import { useEffect } from "react";
import styles from "./project-page.module.scss";

function ProjectPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: ProjectActionTypes.FETCH_PROJECTS });
  }, [dispatch]);

  return (
    <div className={styles.tablePage}>
      <ProjectTable />
    </div>
  );
}

export default ProjectPage;
