import * as React from "react";
import { SecondaryButton } from "@stenajs-webui/elements";
import { ActionMenuButton, ActionMenuButtonProps } from "./ActionMenuButton";

export interface ActionMenuSecondaryButtonProps
  extends Omit<ActionMenuButtonProps, "buttonComponent"> {}

export const ActionMenuSecondaryButton: React.FC<ActionMenuSecondaryButtonProps> = (
  props
) => {
  return <ActionMenuButton buttonComponent={SecondaryButton} {...props} />;
};
