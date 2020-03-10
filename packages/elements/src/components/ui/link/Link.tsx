import cx from "classnames";
import { KeyboardEventHandler } from "react";
import * as React from "react";
import { SpanProps } from "@stenajs-webui/core";
import styles from "./Link.module.css";

interface Props extends SpanProps {
  children?: string;
  disabled?: boolean;
}

export const Link: React.FC<Props> = ({
  children,
  className,
  onClick,
  tabIndex = 0,
  disabled,
  ...spanProps
}) => {
  const onKeyDown: KeyboardEventHandler<HTMLSpanElement> = ev => {
    if ((ev.key === " " || ev.key === "Enter") && onClick) {
      ev.preventDefault();
      onClick(ev as any);
    }
  };
  return (
    <span
      role={"link"}
      tabIndex={tabIndex}
      className={cx(styles.link, disabled && styles.disabled, className)}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={onKeyDown}
      {...spanProps}
    >
      {children}
    </span>
  );
};
