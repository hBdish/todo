import styles from './button.module.scss';
import {classNames, Mods} from "../../shared";
import {ButtonHTMLAttributes, CSSProperties, ReactNode} from "react";


type ButtonVariant = 'primary' | 'clear' | 'success' | 'danger';

type ButtonMargin = '0' | '4px' | '6px' | '8px';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ReactNode;
  disabled?: boolean;
  variant?: ButtonVariant;
  marginTop?: ButtonMargin
  width?: number
  height?: number
}

const Button = (props: ButtonProps) => {
  const {
    className,
    children,
    disabled,
    variant = 'clear',
    marginTop = "0",
    width,
    height,
    ...otherProps
  } = props;

  const mods: Mods = {
    [styles.disabled]: disabled,
  };

  let style: CSSProperties
  if (width || height) style = {marginTop, width: `${width}px`, height: `${height}px`}
  else style = {marginTop}

  return (
    <button
      type="button"
      style={style}
      className={classNames(styles.button, mods, [className, styles[variant]])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export {Button};
