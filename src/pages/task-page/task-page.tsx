import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../shared/hooks";
import {setSelectedProjectId, TaskCard} from "../../components";
import {useParams} from "react-router-dom";
import {TaskActionTypes, TasksActionTypes, TaskSyncActionTypes} from "./model/consts";


function TaskPage() {
  const {isLoading, data} = useAppSelector((state) => state.tasks);
  const {task, editableTask} = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const {id} = useParams<{
    id: string
  }>();

  useEffect(() => {
    dispatch(setSelectedProjectId(id ?? "1"));
    dispatch({type: TasksActionTypes.FETCH_TASKS, id: id});
  }, [dispatch, id]);

  useEffect(() => {
    console.log(editableTask)
  }, [editableTask]);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div>
      {data?.map((el) => (
        <button onClick={() => {
          dispatch({type: TaskSyncActionTypes.SET_TASK, payload: el})

          if (!task) {
            return
          }

          dispatch({
            type: TaskSyncActionTypes.SET_EDITABLE_TASK, payload: {
              ...task,
              status: "Done"
            }
          })

          dispatch({
            type: TaskActionTypes.PATCH_TASK
          })
        }}><TaskCard key={el.id}/></button>
      ))}
    </div>
  );
}

export default TaskPage;
