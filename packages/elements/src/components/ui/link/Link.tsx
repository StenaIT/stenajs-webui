import cx from "classnames";
import * as React from "react";
import { KeyboardEventHandler } from "react";
import { SpanProps } from "@stenajs-webui/core";
import styles from "./Link.module.css";

interface Props extends SpanProps {
  disabled?: boolean;
  disableTabIndex?: boolean;
}

export const Link: React.FC<Props> = ({
  children,
  className,
  onClick,
  tabIndex = 0,
  disableTabIndex,
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
      tabIndex={!disableTabIndex ? tabIndex : undefined}
      className={cx(styles.link, disabled && styles.disabled, className)}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={!disabled ? onKeyDown : undefined}
      {...spanProps}
    >
      {children}
    </span>
  );
};
