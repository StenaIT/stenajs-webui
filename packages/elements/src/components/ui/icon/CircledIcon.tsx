import { Box, exhaustSwitchCaseElseThrow } from "@stenajs-webui/core";
import * as React from "react";
import { cssColor, CssPropColor } from "@stenajs-webui/theme";
import { Icon, IconProps } from "./Icon";
import { MediumIcon, XlIcon } from "../../../icons/IconSizes";

export type CircledIconSizeVariant =
  | CircledIconSizeStandardVariant
  | CircledIconSizeXlVariant;

export type CircledIconSizeStandardVariant = "medium" | "small" | "large";
export type CircledIconSizeXlVariant = "xl";
export type CircledIconVariant = "normal" | "whiteBg";

export type CircledIconProps = CircledIconNormalProps | CircledIconXlProps;

export interface CircledIconCommonProps
  extends Omit<IconProps, "size" | "color" | "icon"> {
  backgroundColor?: CssPropColor;
  iconColor?: CssPropColor;
  variant?: CircledIconVariant;
}

export interface CircledIconNormalProps extends CircledIconCommonProps {
  size?: CircledIconSizeStandardVariant;
  icon: MediumIcon;
}

export interface CircledIconXlProps extends CircledIconCommonProps {
  size: CircledIconSizeXlVariant;
  icon: XlIcon;
}

export const CircledIcon: React.FC<CircledIconProps> = ({
  backgroundColor,
  iconColor = "--swui-text-primary-color",
  size = "medium",
  variant = "normal",
  ...iconProps
}) => {
  const backgroundSize = getBackgroundSize(size);
  const iconSize = getIconSize(size);

  return (
    <Box
      borderRadius={"50%"}
      background={cssColor(backgroundColor ?? getBgColorForVariant(variant))}
      width={backgroundSize}
      height={backgroundSize}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Icon {...iconProps} color={cssColor(iconColor)} size={iconSize} />
    </Box>
  );
};

const getBackgroundSize = (
  size: CircledIconSizeVariant | CircledIconSizeXlVariant,
): string => {
  switch (size) {
    case "small":
      return "32px";
    case "medium":
      return "40px";
    case "large":
      return "64px";
    case "xl":
      return "160px";
    default:
      return exhaustSwitchCaseElseThrow(size);
  }
};

const getIconSize = (
  size: CircledIconSizeVariant | CircledIconSizeXlVariant,
): number => {
  switch (size) {
    case "small":
      return 16;
    case "medium":
      return 20;
    case "large":
      return 32;
    case "xl":
      return 80;
    default:
      return exhaustSwitchCaseElseThrow(size);
  }
};

const getBgColorForVariant = (variant: CircledIconVariant): CssPropColor => {
  return variant === "whiteBg" ? "--lhds-color-ui-50" : "--lhds-color-ui-200";
};
