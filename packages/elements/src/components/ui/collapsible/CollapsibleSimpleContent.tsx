import * as React from "react";
import { ReactNode } from "react";

import styles from "./Collapsible.module.css";
import { Clickable } from "@stenajs-webui/core";

export interface CollapsibleSimpleContentProps {
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  className?: string;
}

export const CollapsibleSimpleContent: React.FC<CollapsibleSimpleContentProps> = ({
  contentLeft,
  contentRight,
  className,
  children
}) => {
  return (
    <div className={styles.content + (className ? ` ${className}` : "")}>
      {contentLeft && <div className={styles.contentLeft}>{contentLeft}</div>}
      {children}
      {contentRight && (
        <div className={styles.contentRight}>{contentRight}</div>
      )}
    </div>
  );
};

export interface CollapsibleClickableContentProps
  extends CollapsibleSimpleContentProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const CollapsibleClickableContent: React.FC<CollapsibleClickableContentProps> = ({
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
      className={styles.content + (className ? ` ${className}` : "")}
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

export const CollapsibleGroupHeading: React.FC<CollapsibleSimpleContentProps> = props => (
  <CollapsibleSimpleContent className={styles.groupHeading} {...props} />
);
