import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { Box, Omit, BoxProps } from "@stenajs-webui/core";
import * as React from "react";
import { forwardRef } from "react";

export interface IconProps
  extends Omit<FontAwesomeIconProps, "color" | "size" | "icon" | "display">,
    Pick<BoxProps, "display"> {
  icon?: IconDefinition;
  color?: string;
  size?: number | string;
}

export const Icon = forwardRef<HTMLDivElement, IconProps>(function Icon(
  {
    className,
    color = "var(--swui-text-primary-color)",
    flip,
    icon,
    pulse,
    rotation,
    size,
    spin,
    style,
    transform,
    display,
    ...props
  },
  ref
) {
  if (!icon) {
    return null;
  }

  const fontSize = typeof size === "string" ? size : (size ?? 16) / 10 + "rem";

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={display}
      ref={ref}
    >
      <FontAwesomeIcon
        className={className}
        color={color}
        flip={flip}
        icon={icon}
        pulse={pulse}
        rotation={rotation}
        spin={spin}
        style={{ fontSize, ...style }}
        transform={transform}
        {...props}
      />
    </Box>
  );
});
