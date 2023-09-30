import styles from './button.module.scss';
import {classNames, Mods} from "../../shared";
import {ButtonHTMLAttributes, CSSProperties, ReactNode} from "react";


type ButtonVariant = 'clear';

type ButtonMargin = '0' | '4px' | '6px' | '8px';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  children?: ReactNode;
  disabled?: boolean;
  variant?: ButtonVariant;
  marginTop?: ButtonMargin
}

const Button = (props: ButtonProps) => {
  const {
    className,
    children,
    disabled,
    variant = 'clear',
    marginTop = "0",
    ...otherProps
  } = props;

  const mods: Mods = {
    [styles.disabled]: disabled,
  };

  const style: CSSProperties = {marginTop}

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
