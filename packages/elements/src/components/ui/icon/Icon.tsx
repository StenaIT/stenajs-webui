import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { Box, Omit } from "@stenajs-webui/core";
import * as React from "react";
import { forwardRef } from "react";

export interface IconProps
  extends Omit<FontAwesomeIconProps, "color" | "size" | "icon"> {
  icon?: IconDefinition;
  color?: string;
  size?: number;
}

export const Icon = forwardRef<HTMLDivElement, IconProps>(function Icon(
  {
    className,
    color = "var(--lhds-color-ui-500)",
    flip,
    icon,
    pulse,
    rotation,
    size = 20,
    spin,
    style,
    transform,
    ...props
  },
  ref
) {
  if (!icon) {
    return null;
  }

  return (
    <Box justifyContent={"center"} alignItems={"center"} ref={ref}>
      <FontAwesomeIcon
        className={className}
        color={color}
        flip={flip}
        icon={icon}
        pulse={pulse}
        rotation={rotation}
        spin={spin}
        style={{ fontSize: size, ...style }}
        transform={transform}
        {...props}
      />
    </Box>
  );
});
