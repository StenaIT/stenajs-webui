import { SmallText } from "@stenajs-webui/core";
import * as React from "react";
import { Popover, PopoverProps } from "../popover/Popover";
import { defaultTooltipTheme, TooltipTheme } from "./TooltipTheme";

export interface TooltipProps extends Omit<PopoverProps, "content"> {
  type?: TooltipInfoType;
  label: string;
  theme?: TooltipTheme;
}

type TooltipInfoType = "info" | "warning" | "error";

export const Tooltip: React.FC<TooltipProps> = ({
  type = "info",
  label,
  theme = defaultTooltipTheme,
  ...popoverProps
}) => {
  const textColor =
    type === "error"
      ? theme.textColorError
      : type === "warning"
      ? theme.textColorWarning
      : theme.textColor;

  const background =
    type === "error"
      ? theme.backgroundError
      : type === "warning"
      ? theme.backgroundWarning
      : theme.background;

  return (
    <Popover
      {...popoverProps}
      background={background}
      content={<SmallText color={textColor}>{label}</SmallText>}
    />
  );
};
