import * as React from "react";
import { PrimaryButton, PrimaryButtonProps } from "@stenajs-webui/elements";
import { ActionMenuButton, ActionMenuButtonProps } from "./ActionMenuButton";

export interface ActionMenuPrimaryButtonProps
  extends Omit<ActionMenuButtonProps, "buttonComponent">,
    Pick<PrimaryButtonProps, "variant"> {}

export const ActionMenuPrimaryButton: React.FC<ActionMenuPrimaryButtonProps> = (
  props
) => {
  return <ActionMenuButton buttonComponent={PrimaryButton} {...props} />;
};
