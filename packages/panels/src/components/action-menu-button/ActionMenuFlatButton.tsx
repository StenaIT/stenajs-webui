import * as React from "react";
import { FlatButton } from "@stenajs-webui/elements";
import { ActionMenuButton, ActionMenuButtonProps } from "./ActionMenuButton";

export interface ActionMenuFlatButtonProps
  extends Omit<ActionMenuButtonProps, "buttonComponent"> {}

export const ActionMenuFlatButton: React.FC<ActionMenuFlatButtonProps> = (
  props
) => {
  return <ActionMenuButton buttonComponent={FlatButton} {...props} />;
};
