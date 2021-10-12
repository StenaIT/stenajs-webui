import {
  SeparatorLine,
  SeparatorLineProps,
  Spacing,
} from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";

export interface SidebarMenuSeparatorProps extends SeparatorLineProps {}

export const SidebarMenuSeparator: React.FC<SidebarMenuSeparatorProps> = (
  separatorLineProps
) => {
  return (
    <Spacing>
      <SeparatorLine
        color={cssColor("--lhds-color-blue-700")}
        {...separatorLineProps}
      />
    </Spacing>
  );
};
