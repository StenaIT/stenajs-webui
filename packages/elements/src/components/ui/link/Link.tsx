import cx from "classnames";
import * as React from "react";
import { KeyboardEventHandler } from "react";
import { AnchorElementProps } from "@stenajs-webui/core";
import styles from "./Link.module.css";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface LinkProps extends AnchorElementProps {
  disabled?: boolean;
  disableTabIndex?: boolean;
  iconLeft?: IconDefinition;
  iconRight?: IconDefinition;
  variant?: LinkVariant;
  size?: LinkSize;
}

export type LinkVariant = "standard" | "caption" | "overline";
export type LinkSize = "large" | "medium" | "small" | "smaller";

export const Link: React.FC<LinkProps> = ({
  children,
  className,
  onClick,
  tabIndex = 0,
  disableTabIndex,
  disabled,
  variant = "standard",
  size = "medium",
  iconLeft,
  iconRight,
  href,
  ...anchorProps
}) => {
  const onKeyDown: KeyboardEventHandler<HTMLSpanElement> = (ev) => {
    if ((ev.key === " " || ev.key === "Enter") && onClick) {
      ev.preventDefault();
      onClick(ev as any);
    }
  };
  return (
    <a
      tabIndex={!disableTabIndex ? tabIndex : undefined}
      className={cx(
        styles.link,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        className
      )}
      href={disabled ? undefined : href}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={!disabled ? onKeyDown : undefined}
      {...anchorProps}
    >
      {iconLeft && (
        <span style={{ marginLeft: "2px", marginRight: "6px" }}>
          <FontAwesomeIcon icon={iconLeft} />
        </span>
      )}
      {children}
      {iconRight && (
        <span style={{ marginLeft: "6px", marginRight: "2px" }}>
          <FontAwesomeIcon icon={iconRight} />
        </span>
      )}
    </a>
  );
};
