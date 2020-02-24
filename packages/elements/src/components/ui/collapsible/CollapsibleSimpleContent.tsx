import * as React from "react";
import { ReactNode } from "react";

import styles from "./Collapsible.module.css";

export interface CollapsibleSimpleContentProps {
  contentLeft?: ReactNode;
  label: string;
  contentRight?: ReactNode;
  className?: string;
}

export const CollapsibleSimpleContent: React.FC<CollapsibleSimpleContentProps> = ({
  contentLeft,
  label,
  contentRight,
  className
}) => {
  return (
    <div className={styles.content + (className ? ` ${className}` : "")}>
      {contentLeft && <div className={styles.contentLeft}>{contentLeft}</div>}
      <div className={styles.label}>{label}</div>
      {contentRight && (
        <div className={styles.contentRight}>{contentRight}</div>
      )}
    </div>
  );
};

export const CollapsibleGroupHeading: React.FC<CollapsibleSimpleContentProps> = props => (
  <CollapsibleSimpleContent className={styles.groupHeading} {...props} />
);
