import {useAppDispatch, useAppSelector} from "../../../../shared";
import {Input} from "../../../../ui/input";
import {createTask, setEditableTask as setEditableTaskAction} from "../../../task-card/model/slice/task-actions";
import {Button} from "../../../../ui/button";
import {TaskType} from "../../../task-card/model/types/task-schema";
import {Dispatch, SetStateAction, useState} from "react";

interface CreateButtonProps {
  isCreate: boolean
  setIsCreate: Dispatch<SetStateAction<boolean>>
}

const CreateButton = (props: CreateButtonProps) => {
  const {
    isCreate,
    setIsCreate,

  } = props;
  const dispatch = useAppDispatch()
  const {selectedProjectId} = useAppSelector((state) => state.projects);
  const [creatableTask, setCreatableTask] = useState<TaskType>(
    {
      title: "",
      description: '',
      status: "Queue",
      dateCreated: '2002-02-07',
      dateCompleted: '2002-02-07',
      priority: '',
      projectId: selectedProjectId,
      timeInWork: 123,
      number: '',
    }
  )

  if (isCreate) {
    return (
      <div>
        <Input
          onBlur={() => {
            if (Boolean(creatableTask.title)) {
              dispatch(setEditableTaskAction(creatableTask))
              dispatch(createTask(creatableTask))
              setCreatableTask(prevState => {
                return {
                  ...prevState,
                  title: ''
                }
              })
            }
            setIsCreate(false)
          }
          }
          autoFocus
          value={creatableTask.title}
          onChange={(value) => setCreatableTask(prevState => {
            return {
              ...prevState,
              title: value
            }
          })}
        />
      </div>)
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
  )

};

export {CreateButton};
