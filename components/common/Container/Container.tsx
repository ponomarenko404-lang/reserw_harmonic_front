import type { ReactNode } from "react";
import css from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div className={`${css.container} ${className}`.trim()}>{children}</div>
  );
}
