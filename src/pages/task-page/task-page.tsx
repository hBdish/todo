import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { TaskCard } from "../../components";
import { TaskActionTypes } from "./model/consts";

function TaskPage() {
  const { isLoading, data } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({ type: TaskActionTypes.FETCH_TASKS });
  }, [dispatch]);

  if (isLoading) {
    return <div>LOADING</div>;
  }

  return (
    <div>
      {data?.map((el) => (
        <TaskCard key={el.id} />
      ))}
    </div>
  );
}

export default TaskPage;
