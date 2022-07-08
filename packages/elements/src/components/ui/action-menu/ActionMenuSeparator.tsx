import { SeparatorLine } from "@stenajs-webui/core";
import * as React from "react";

export interface ActionDropdownSeparatorProps {}

export const ActionMenuSeparator: React.FC<
  ActionDropdownSeparatorProps
> = () => {
  return <SeparatorLine />;
};
