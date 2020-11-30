import { SeparatorLine, Spacing } from "@stenajs-webui/core";
import * as React from "react";

export interface ActionDropdownSeparatorProps {}

export const ActionMenuSeparator: React.FC<ActionDropdownSeparatorProps> = () => {
  return (
    <Spacing>
      <SeparatorLine />
    </Spacing>
  );
};
