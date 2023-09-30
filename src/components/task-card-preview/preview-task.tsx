import {FC} from "react";
import {usePreview} from "react-dnd-preview";
import {TaskType} from "../task-card/model/types/task-schema";
import {DndPreviewPortal} from "../../ui/portals";
import {TaskCard} from "../task-card";

const PreviewTask: FC = () => {
  const preview = usePreview<{ type: string, task: TaskType }, Element>()

  if (!preview.display) return null

  const {item, style} = preview;
  return (
    <DndPreviewPortal display={preview.display}>
      <TaskCard style={style} task={item.task}></TaskCard>
    </DndPreviewPortal>
  );
};

export {PreviewTask};
