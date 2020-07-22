import { ButtonProps, Clickable } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./Collapsible.module.css";
import { CollapsibleSimpleContentProps } from "./CollapsibleContent";
import { CollapsibleEmptyContent } from "./CollapsibleEmptyContent";

interface CollapsibleClickableContentProps
  extends CollapsibleSimpleContentProps,
    ButtonProps {}

export const CollapsibleClickableContent: React.FC<CollapsibleClickableContentProps> = ({
  contentLeft,
  contentRight,
  className,
  onClick,
  children,
  ...props
}) => {
  return (
    <Clickable
      disableFocusHighlight
      disableOpacityOnClick
      className={cx(styles.content, className)}
      onClick={onClick}
      {...props}
    >
      {contentLeft && <div className={styles.contentLeft}>{contentLeft}</div>}
      {children ?? <CollapsibleEmptyContent />}
      {contentRight && (
        <div className={styles.contentRight}>{contentRight}</div>
      )}
    </Clickable>
  );
};
