import { Box, exhaustSwitchCaseElseThrow } from "@stenajs-webui/core";
import * as React from "react";
import { cssColor, CssPropColor } from "@stenajs-webui/theme";
import { Icon, IconProps } from "./Icon";

export type CircledIconSizeVariant = "medium" | "small";

export interface CircledIconProps extends Omit<IconProps, "size" | "color"> {
  backgroundColor?: CssPropColor;
  iconColor?: CssPropColor;
  size?: CircledIconSizeVariant;
}

export const CircledIcon: React.FC<CircledIconProps> = ({
  backgroundColor = "--lhds-color-ui-200",
  iconColor = "--swui-text-primary-color",
  size = "medium",
  ...iconProps
}) => {
  const backgroundSize = getBackgroundSize(size);
  const iconSize = getIconSize(size);

  return (
    <Box
      borderRadius={"50%"}
      background={cssColor(backgroundColor)}
      width={backgroundSize}
      height={backgroundSize}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Icon {...iconProps} color={cssColor(iconColor)} size={iconSize} />
    </Box>
  );
};

const getBackgroundSize = (size: CircledIconSizeVariant): string => {
  switch (size) {
    case "small":
      return "32px";
    case "medium":
      return "40px";
    default:
      return exhaustSwitchCaseElseThrow(size);
  }
};

const getIconSize = (size: CircledIconSizeVariant): number => {
  switch (size) {
    case "small":
      return 16;
    case "medium":
      return 20;
    default:
      return exhaustSwitchCaseElseThrow(size);
  }
};
