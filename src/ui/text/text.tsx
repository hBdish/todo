import { CSSProperties, memo } from "react";
import styles from "./text.module.scss";
import { classNames } from "../../shared";

type TextVariant = "primary" | "accent";
type TextAlign = "right" | "left" | "center";
type TextSize = "size_s" | "size_m" | "size_l";
type HeaderTagType = "h1" | "h2" | "h3";

interface TextProps {
  className?: string;
  title?: string | null;
  text?: string | null;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;
  style?: CSSProperties;
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  size_s: "h3",
  size_m: "h2",
  size_l: "h1",
};

const Text = memo((props: TextProps) => {
  const {
    className,
    text = "",
    title = "",
    variant = "primary",
    align = "left",
    size = "size_m",
    bold,
    style,
  } = props;

  const HeaderTag = mapSizeToHeaderTag[size];

  return (
    <div
      className={classNames(styles.Text, { [styles.bold]: bold }, [
        className,
        styles[variant],
        styles[align],
        styles[size],
      ])}
    >
      {title && (
        <HeaderTag style={style} className={styles.title}>
          {title ?? ""}
        </HeaderTag>
      )}
      {text && (
        <p style={style} className={styles.text}>
          {text ?? ""}
        </p>
      )}
    </div>
  );
});

export { Text };
