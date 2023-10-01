import styles from './popover.module.scss';
import {classNames, MoreIcon, useOutsideEvent} from "../../shared";
import React, {CSSProperties, ReactNode, useRef, useState} from "react";
import {Button} from "../button";
import {AppImage} from "../app-image";

interface PopoverProps {
  className?: string
  children?: ReactNode
  positionRight?: boolean
}

const Popover = (props: PopoverProps) => {
  const {className, children, positionRight = false} = props;
  const [opened, setOpened] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  let contentInLineStyle: CSSProperties = {}

  if (positionRight) contentInLineStyle = {right: '0px'}

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
        <div
          style={contentInLineStyle}
          onClick={(e) => e.stopPropagation()} ref={popupRef}
          className={styles.popoverContent}>
          {children}
        </div>
      )}
    </div>
  );
};

export {Popover};
