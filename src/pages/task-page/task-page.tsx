import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../shared";
import {setSelectedProjectId, TaskTable} from "../../components";
import {useParams} from "react-router-dom";
import {TaskTableActionTypes} from "../../components/task-table/model/consts";
import {DndProvider} from "react-dnd-multi-backend";
import {HTML5toTouch} from "rdndmb-html5-to-touch";
import {PreviewTask} from "../../components/task-table/components/task-card-preview/preview-task";

function TaskPage() {
  const {isLoading} = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const {id} = useParams<{
    id: string
  }>();

  useEffect(() => {
    dispatch(setSelectedProjectId(id ?? ''));
    dispatch({type: TaskTableActionTypes.FETCH_TASKS, id: id});
  }, [dispatch, id]);


  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <DndProvider options={HTML5toTouch}>
      <PreviewTask/>
      <TaskTable/>
    </DndProvider>
  );
}

export default TaskPage;
