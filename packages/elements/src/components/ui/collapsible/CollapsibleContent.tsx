import * as React from "react";
import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

import styles from "./Collapsible.module.css";
import { Clickable } from "@stenajs-webui/core";

export interface CollapsibleSimpleContentProps {
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
}

export const CollapsibleContent: React.FC<CollapsibleSimpleContentProps &
  HTMLAttributes<HTMLDivElement>> = ({
  contentLeft,
  contentRight,
  className,
  children,
  ...props
}) => {
  return (
    <div className={`${styles.content} ${className ?? ""}`} {...props}>
      {contentLeft && <div className={styles.contentLeft}>{contentLeft}</div>}
      {children}
      {contentRight && (
        <div className={styles.contentRight}>{contentRight}</div>
      )}
    </div>
  );
};

export const CollapsibleClickableContent: React.FC<CollapsibleSimpleContentProps &
  ButtonHTMLAttributes<HTMLButtonElement>> = ({
  contentLeft,
  contentRight,
  className,
  onClick,
  disabled,
  children
}) => {
  return (
    <Clickable
      disableFocusHighlight
      disableOpacityOnClick
      className={`${styles.content} ${className ?? ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {contentLeft && <div className={styles.contentLeft}>{contentLeft}</div>}
      {children}
      {contentRight && (
        <div className={styles.contentRight}>{contentRight}</div>
      )}
    </Clickable>
  );
};

export const CollapsibleGroupHeading: React.FC<CollapsibleSimpleContentProps &
  HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <CollapsibleContent
    className={`${styles.groupHeading} ${className ?? ""}`}
    {...props}
  />
);
