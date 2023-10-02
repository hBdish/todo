import React, {
  InputHTMLAttributes,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./textarea.module.scss";
import { Text } from "../text";
import { Vstack } from "../stack";
import { classNames, Mods } from "../../shared";

type HTMLTextAreaProps = Omit<
  InputHTMLAttributes<HTMLTextAreaElement>,
  "value" | "onChange" | "readOnly" | "pattern"
>;

interface TextAreaProps extends HTMLTextAreaProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  readonly?: boolean;
  label?: string;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

const Textarea = memo((props: TextAreaProps) => {
  const {
    className,
    value,
    onChange,
    autoFocus,
    readonly = false,
    placeholder,
    addonLeft,
    addonRight,
    label = "",
    ...otherProps
  } = props;

  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    onChange?.(value);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (autoFocus) {
      ref.current?.focus();
      setIsFocused(true);
    }
  }, [autoFocus]);

  const mods: Mods = {
    [styles.readonly]: readonly,
    [styles.focused]: isFocused,
    [styles.withAddonLeft]: Boolean(addonLeft),
    [styles.withAddonRight]: Boolean(addonRight),
  };

  const input = (
    <div className={classNames(styles.textarea, mods, [className])}>
      <div className={styles.addonLeft}>{addonLeft}</div>
      <textarea
        ref={ref}
        readOnly={readonly}
        value={value}
        onChange={onChangeHandler}
        className={styles.textareaField}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        {...otherProps}
      />
      <span role="textbox"></span>
      <div className={styles.addonRight}>{addonRight}</div>
    </div>
  );

  if (label) {
    return (
      <Vstack w100>
        <Text title={label} />
        {input}
      </Vstack>
    );
  }

  return input;
});

export { Textarea };
