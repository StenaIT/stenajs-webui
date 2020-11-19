import * as React from "react";
import {
  SeparatorLine,
  SeparatorLineProps,
  Spacing,
} from "@stenajs-webui/core";

export interface SidebarMenuSeparatorProps extends SeparatorLineProps {}

export const SidebarMenuSeparator: React.FC<SidebarMenuSeparatorProps> = (
  separatorLineProps
) => {
  return (
    <Spacing>
      <SeparatorLine
        color={"var(--lhds-color-blue-700)"}
        {...separatorLineProps}
      />
    </Spacing>
  );
};
