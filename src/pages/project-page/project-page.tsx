import {ProjectActionTypes, ProjectTable} from "../../components";
import {useAppDispatch, useAppSelector} from "../../shared";
import {useEffect} from "react";

function ProjectPage() {
  const {isLoading, data: projects} = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({type: ProjectActionTypes.FETCH_PROJECTS})
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <ProjectTable projects={projects}/>
  );
}

export default ProjectPage;
