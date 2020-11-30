import { Text } from "@stenajs-webui/core";
import * as React from "react";
import { Popover, PopoverProps, PopoverVariant } from "../popover/Popover";

export interface TooltipProps extends Partial<Omit<PopoverProps, "content">> {
  variant?: PopoverVariant;
  label: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ label, ...popoverProps }) => {
  return (
    <Popover {...popoverProps} content={<Text size={"small"}>{label}</Text>} />
  );
};
