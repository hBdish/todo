import { useAppDispatch, useAppSelector } from "../../../../shared";
import { Input } from "../../../../ui/input";
import {
  createTask,
  setEditableTask as setEditableTaskAction,
} from "../../../task-card/model/slice/task-actions";
import { Button } from "../../../../ui/button";
import { TaskType } from "../../../task-card/model/types/task-schema";
import { Dispatch, SetStateAction, useState } from "react";

interface CreateButtonProps {
  isCreate: boolean;
  setIsCreate: Dispatch<SetStateAction<boolean>>;
}

const CreateButton = (props: CreateButtonProps) => {
  const { isCreate, setIsCreate } = props;
  const dispatch = useAppDispatch();
  const { selectedProjectId } = useAppSelector((state) => state.projects);
  const [creatableTask, setCreatableTask] = useState<TaskType>({
    title: "",
    description: "",
    status: "Queue",
    dateCreated: new Date(Date.now())
      .toLocaleDateString()
      .split(".")
      .reverse()
      .join("-"),
    dateCompleted: "",
    priority: "",
    projectId: selectedProjectId,
    timeInWork: -1,
    number: `${Math.round(Math.random() * 100)}${new Date().getSeconds()}`,
  });

  if (isCreate) {
    return (
      <div>
        <Input
          onBlur={() => {
            if (creatableTask.title) {
              dispatch(setEditableTaskAction(creatableTask));
              dispatch(createTask(creatableTask));
              setCreatableTask((prevState) => {
                return {
                  ...prevState,
                  title: "",
                };
              });
            }
            setIsCreate(false);
          }}
          autoFocus
          value={creatableTask.title}
          onChange={(value) =>
            setCreatableTask((prevState) => {
              return {
                ...prevState,
                title: value,
              };
            })
          }
        />
      </div>
    );
  }

  return (
    <Button
      width={312}
      height={48}
      onClick={() => setIsCreate(true)}
      marginTop={"8px"}
    >
      Добавить
    </Button>
  );
};

export { CreateButton };
