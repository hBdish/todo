import styles from './modal.module.scss';
import {classNames, useModal} from "../../shared";
import {ReactNode} from "react";
import {Portal} from "../portals";
import {Overlay} from "../overlay";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const Modal = (props: ModalProps) => {
  const {className, children, isOpen, onClose} = props;

  const {isClosing, close, isMounted} = useModal({
    animationDelay: 300,
    onClose,
    isOpen,
  });

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(
        styles.Modal,
        {
          [styles.opened]: isOpen,
          [styles.isClosing]: isClosing,
        },
        [className])}>
        <Overlay onClick={close}/>
        <div className={styles.content}>{children}</div>
      </div>
    </Portal>

  );
};

export {Modal};
