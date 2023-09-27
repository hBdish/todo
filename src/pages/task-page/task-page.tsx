import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../shared/hooks";
import {setSelectedProjectId, TaskCard} from "../../components";
import {useParams} from "react-router-dom";
import {TaskActionTypes} from "./model/consts";


function TaskPage() {
  const {isLoading, data} = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();
  const {id} = useParams<{
    id: string
  }>();

  useEffect(() => {
    dispatch(setSelectedProjectId(id ?? "1"));
    dispatch({type: TaskActionTypes.FETCH_TASKS, id: id});
  }, [dispatch, id]);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div>
      {data?.map((el) => (
        <TaskCard key={el.id}/>
      ))}
    </div>
  );
}

export default TaskPage;
