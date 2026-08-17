import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "fill" | "outline" | "link";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
};

export default function Button({
  children,
  className = "",
  variant = "fill",
  size = "md",
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = "button",
  ...props
}: ButtonProps) {
  const buttonClassName = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClassName} type={type} {...props}>
      {leftIcon ? <span className={styles.icon}>{leftIcon}</span> : null}
      <span className={styles.label}>{children}</span>
      {rightIcon ? <span className={styles.icon}>{rightIcon}</span> : null}
    </button>
  );
}
