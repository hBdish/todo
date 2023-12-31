import React, {
  InputHTMLAttributes,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./input.module.scss";
import { Text } from "../text";
import { Vstack } from "../stack";
import { classNames, Mods } from "../../shared";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly" | "pattern"
>;

type InputVariant = "primary" | "search" | "big";

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  readonly?: boolean;
  pattern?: string;
  label?: string;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
  variant?: InputVariant;
}

const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = "text",
    autoFocus,
    readonly = false,
    placeholder,
    pattern = "(.*?)",
    addonLeft,
    addonRight,
    label = "",
    variant = "primary",
    onBlur,
    onFocus,
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    RegExp(pattern).test(value) && onChange?.(value);
  };

  const onBlurEffect = () => {
    setIsFocused(false);
  };

  const onFocusEffect = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    if (autoFocus) {
      ref.current?.focus();
      setIsFocused(true);
    }
  }, [autoFocus]);

  const mods: Mods = {
    [styles.readonly]: readonly,
    [styles.withAddonLeft]: Boolean(addonLeft),
    [styles.withAddonRight]: Boolean(addonRight),
  };

  const input = (
    <div
      className={classNames(styles.Input, mods, [className, styles[variant]])}
    >
      <div className={styles.addonLeft}>{addonLeft}</div>
      <input
        ref={ref}
        readOnly={readonly}
        type={type}
        value={value}
        onChange={onChangeHandler}
        className={classNames(
          styles.inputField,
          { [styles.focused]: isFocused },
          [],
        )}
        onFocus={(event) => {
          onFocusEffect();
          if (!onFocus) return;
          onFocus(event);
        }}
        onBlur={(event) => {
          onBlurEffect();
          if (!onBlur) return;
          onBlur(event);
        }}
        pattern={pattern}
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

export { Input };
