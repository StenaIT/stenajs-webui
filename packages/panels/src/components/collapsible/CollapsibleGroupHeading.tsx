import { DivProps } from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./Collapsible.module.css";
import {
  CollapsibleContent,
  CollapsibleSimpleContentProps,
} from "./CollapsibleContent";

interface CollapsibleGroupHeadingProps
  extends CollapsibleSimpleContentProps,
    DivProps {}

export const CollapsibleGroupHeading: React.FC<CollapsibleGroupHeadingProps> = ({
  className,
  ...props
}) => (
  <CollapsibleContent
    className={cx(styles.groupHeading, className)}
    {...props}
  />
);
