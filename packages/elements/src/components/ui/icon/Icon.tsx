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
  size?: number;
}

export const Icon = forwardRef<HTMLDivElement, IconProps>(function Icon(
  {
    className,
    color = "var(--lhds-color-ui-900)",
    flip,
    icon,
    pulse,
    rotation,
    size = 16,
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
        style={{ fontSize: size / 10 + "rem", ...style }}
        transform={transform}
        {...props}
      />
    </Box>
  );
});
