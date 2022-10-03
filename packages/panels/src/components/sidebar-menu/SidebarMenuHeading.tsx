import { Box, Text, TextProps } from "@stenajs-webui/core";
import * as React from "react";
import styles from "./SidebarMenuHeading.module.css";
import {
  CollapsibleContent,
  CollapsibleSimpleContentProps,
} from "../collapsible/CollapsibleContent";
import { SidebarMenuSeparator } from "./SidebarMenuSeparator";

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
    <>
      <Box spacing={2} indent={2}>
        <CollapsibleContent
          className={styles.sidebarMenuHeading}
          contentLeft={contentLeft}
          contentRight={contentRight}
        >
          <Text
            variant={"overline"}
            color={"var(--swui-sidebar-menu-heading-text-color)"}
            {...textProps}
          >
            {label}
          </Text>
        </CollapsibleContent>
      </Box>
      <SidebarMenuSeparator />
    </>
  );
};
