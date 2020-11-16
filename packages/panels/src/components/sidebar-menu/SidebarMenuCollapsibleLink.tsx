import { CollapsibleSimpleContentProps } from "../..";
import {
  ButtonElementProps,
  Clickable,
  StandardText,
} from "@stenajs-webui/core";
import cx from "classnames";
import * as React from "react";
import styles from "./SidebarMenu.module.css";

interface SidebarMenuClickableContentProps
  extends CollapsibleSimpleContentProps,
    ButtonElementProps {
  label?: string;
  selected?: boolean;
}

export const SidebarMenuCollapsibleLink: React.FC<SidebarMenuClickableContentProps> = ({
  className,
  onClick,
  children,
  selected,
  label,
  ...props
}) => {
  const selectedClass: string = styles.selectedMenuItem;
  return (
    <Clickable
      disableFocusHighlight
      disableOpacityOnClick
      className={cx(styles.contentCollapsibleLink, className, {
        [selectedClass]: selected,
      })}
      onClick={onClick}
      {...props}
    >
      <StandardText>{label}</StandardText>
    </Clickable>
  );
};
