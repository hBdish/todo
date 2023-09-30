import {DetailedHTMLProps, HTMLAttributes, ReactNode} from 'react';

import styles from './flex.module.scss';
import {classNames, Mods} from "../../../shared";

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '8' | '16' | '24' | '32' | '40';

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
  className?: string;
  children?: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  gap?: FlexGap;
  w100?: boolean;
}

const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'start',
    direction = 'row',
    gap,
    w100 = false,
    ...otherProps
  } = props;

  const justifyClasses: Record<FlexJustify, string> = {
    start: styles.justifyStart,
    end: styles.justifyEnd,
    center: styles.justifyCenter,
    between: styles.justifyBetween,
  };

  const alignClasses: Record<FlexAlign, string> = {
    start: styles.alignStart,
    end: styles.alignEnd,
    center: styles.alignCenter,
  };

  const directionClasses: Record<FlexDirection, string> = {
    row: styles.directionRow,
    column: styles.directionColumn,
  };

  const gapClasses: Record<FlexGap, string> = {
    8: styles.gap8,
    16: styles.gap16,
    24: styles.gap24,
    32: styles.gap32,
    40: styles.gap40,
  };

  const classes = [
    className,
    justifyClasses[justify],
    alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
  ];

  const mods: Mods = {
    [styles.w100]: w100,
  };

  return (
    <div
      className={classNames(styles.Flex, mods, classes)}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export {Flex};
