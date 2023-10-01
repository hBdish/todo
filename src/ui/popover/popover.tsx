import styles from './popover.module.scss';
import {classNames, MoreIcon, useOutsideEvent} from "../../shared";
import React, {ReactNode, useRef, useState} from "react";
import {Button} from "../button";
import {AppImage} from "../app-image";

interface PopoverProps {
  className?: string
  children?: ReactNode
}

const Popover = (props: PopoverProps) => {
  const {className, children} = props;
  const [opened, setOpened] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useOutsideEvent({
    ref: popupRef,
    onOutside: () => setOpened(false),
  });

  return (
    <div className={classNames(styles.popup, {}, [className])}>
      <Button
        className={styles.popup}
        onClick={(e) => {
          e.stopPropagation()
          setOpened(true)
        }}
      >
        <AppImage
          className={classNames(styles.popoverButton, {[styles.active]: opened}, [])}
          src={MoreIcon}
        />
      </Button>
      {opened && (
        <div onClick={(e) => e.stopPropagation()} ref={popupRef} className={styles.navbarContent}>
          {children}
        </div>
      )}
    </div>
  );
};

export {Popover};
