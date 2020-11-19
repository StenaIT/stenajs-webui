import { Box, SmallerText, TextProps } from "@stenajs-webui/core";
import * as React from "react";
import styles from "./SidebarMenuHeading.module.css";
import {
  CollapsibleContent,
  CollapsibleSimpleContentProps,
} from "../collapsible/CollapsibleContent";

export interface SidebarMenuHeadingProps
  extends Pick<CollapsibleSimpleContentProps, "contentLeft" | "contentRight">,
    TextProps {
  label?: string;
}

export const SidebarMenuHeading: React.FC<SidebarMenuHeadingProps> = ({
  className,
  label,
  contentLeft,
  contentRight,
  ...textProps
}) => {
  return (
    <Box spacing={2} indent={2}>
      <CollapsibleContent
        className={styles.sidebarMenuHeading}
        contentLeft={contentLeft}
        contentRight={contentRight}
      >
        <SmallerText
          color={"var(--swui-sidebar-menu-heading-text-color)"}
          fontWeight={"var(--swui-sidebar-menu-heading-font-weight)"}
          {...textProps}
        >
          {label}
        </SmallerText>
      </CollapsibleContent>
    </Box>
  );
};
