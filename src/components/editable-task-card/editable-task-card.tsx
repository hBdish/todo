import {Modal} from "../../ui/modal";
import styles from './editable-task-card.module.scss'
import {TaskType} from "../task-card/model/types/task-schema";
import {Table} from "../../ui/table";
import {Text} from "../../ui/text";
import {Input} from "../../ui/input";

interface EditableTaskCardProps {
  isOpen: boolean;
  onClose: () => void;
  task?: TaskType
}

const EditableTaskCard = (props: EditableTaskCardProps) => {
  const {onClose, isOpen, task} = props;

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
    >
      <div className={styles.modal}>
        <div className={styles.leftContent}>
          <Input value={task?.number}/>
          <Input value={task?.title}/>
          <Input
            label={'Описание'}
            placeholder={'Редактировать описание'}
            value={task?.description}
          />
          <div className={styles.commentBlock}></div>
        </div>
        <Table columnWidths={['100%']} className={styles.rightContent}>
          <Table.HeaderCell>
            <Text title={'Сведения'} bold/>
          </Table.HeaderCell>

          <Table.Cell>
            <Input label={'Приоритет'} value={task?.priority}/>
          </Table.Cell>
          <Table.Cell>
            <Input label={'Время в работе'} value={task?.timeInWork}/>
          </Table.Cell>
          <Table.Cell>
            <Input label={'Дата создания'} value={task?.dateCreated}/>
          </Table.Cell>
          <Table.Cell>
            <Input label={'Дата завершения'} value={task?.dateCompleted}/>
          </Table.Cell>

        </Table>

      </div>
    </Modal>
  );
};

export {EditableTaskCard};
