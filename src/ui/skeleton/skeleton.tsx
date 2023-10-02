import { CSSProperties } from "react";

import styles from "./skeleton.module.scss";
import { classNames } from "../../shared";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  padding?: string | number;
  border?: string;
}

const Skeleton = (props: SkeletonProps) => {
  const {
    className,
    height = 120,
    width = 320,
    padding = 0,
    border = "none",
  } = props;

  const style: CSSProperties = {
    width,
    height,
    padding,
    borderRadius: border,
  };

  return (
    <div className={classNames(styles.Skeleton, {}, [className])} style={style}>
      <div className={styles.image} />
    </div>
  );
};

export { Skeleton };
