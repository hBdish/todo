import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../shared/hooks";
import {setSelectedProjectId, TaskTable} from "../../components";
import {useParams} from "react-router-dom";
import {TasksActionTypes} from "./model/consts";
import {DndProvider} from "react-dnd-multi-backend";
import {HTML5toTouch} from "rdndmb-html5-to-touch";


function TaskPage() {
  const {isLoading} = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const {id} = useParams<{
    id: string
  }>();

  useEffect(() => {
    dispatch(setSelectedProjectId(id ?? ''));
    dispatch({type: TasksActionTypes.FETCH_TASKS, id: id});
  }, [dispatch, id]);


  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <DndProvider options={HTML5toTouch}>
      <TaskTable/>
    </DndProvider>
  );
}

export default TaskPage;
