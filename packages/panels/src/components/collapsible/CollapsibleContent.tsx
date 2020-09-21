import cx from "classnames";
import * as React from "react";
import { HTMLAttributes, ReactNode } from "react";
import styles from "./Collapsible.module.css";
import { CollapsibleEmptyContent } from "./CollapsibleEmptyContent";

export interface CollapsibleSimpleContentProps {
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
}

export const CollapsibleContent: React.FC<
  CollapsibleSimpleContentProps & HTMLAttributes<HTMLDivElement>
> = ({ contentLeft, contentRight, className, children, ...props }) => {
  return (
    <div className={cx(styles.content, className)} {...props}>
      {contentLeft && <div className={styles.contentLeft}>{contentLeft}</div>}
      {children ?? <CollapsibleEmptyContent />}
      {contentRight && (
        <div className={styles.contentRight}>{contentRight}</div>
      )}
    </div>
  );
};
