import { Box, DivProps, SmallText } from "@stenajs-webui/core";
import * as React from "react";
import styles from "./SidebarMenu.module.css";
import {
  CollapsibleContent,
  CollapsibleSimpleContentProps,
} from "../collapsible/CollapsibleContent";

interface CollapsibleGroupHeadingProps
  extends CollapsibleSimpleContentProps,
    DivProps {
  label?: string;
}

export const SidebarMenuHeading: React.FC<CollapsibleGroupHeadingProps> = ({
  className,
  label,
  ...props
}) => {
  return (
    <Box spacing={2} indent={2}>
      <CollapsibleContent className={styles.heading} {...props}>
        <SmallText>{label}</SmallText>
      </CollapsibleContent>
    </Box>
  );
};
