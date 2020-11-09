import { CollapsibleSimpleContentProps } from "../..";
import {
  Box,
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
  selected?: boolean;
}

export const SidebarMenuCollapsibleLink: React.FC<SidebarMenuClickableContentProps> = ({
  className,
  onClick,
  children,
  selected,
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
      <Box spacing={1} flex={1} flexDirection={"row"}>
        <StandardText>{children}</StandardText>
      </Box>
    </Clickable>
  );
};
