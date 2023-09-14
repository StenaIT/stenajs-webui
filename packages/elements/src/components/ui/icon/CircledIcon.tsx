import { Box, exhaustSwitchCaseElseThrow } from "@stenajs-webui/core";
import * as React from "react";
import { cssColor, CssPropColor } from "@stenajs-webui/theme";
import { Icon, IconProps } from "./Icon";

type SizeVariant = "small" | "medium";

export interface CircledIconProps extends Omit<IconProps, "size" | "color"> {
  iconSize?: number;
  backgroundColor?: CssPropColor;
  iconColor?: CssPropColor;
  sizeVariant?: SizeVariant;
}

export const CircledIcon: React.FC<CircledIconProps> = ({
  backgroundColor = "--lhds-color-ui-200",
  iconColor = "--swui-text-primary-color",
  sizeVariant = "medium",
  iconSize = 20,
  ...iconProps
}) => {
  const backgroundSize = getBackgroundSize(sizeVariant);

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

const getBackgroundSize = (size: SizeVariant): string => {
  switch (size) {
    case "small":
      return "32px";
    case "medium":
      return "40px";
    default:
      return exhaustSwitchCaseElseThrow(size);
  }
};
