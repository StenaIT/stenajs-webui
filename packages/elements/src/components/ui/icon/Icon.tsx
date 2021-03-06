import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  Props as FontAwesomeProps,
} from "@fortawesome/react-fontawesome";
import { Box, Omit, useMouseIsOver } from "@stenajs-webui/core";
import * as React from "react";
import { useRef } from "react";

export interface IconProps
  extends Omit<FontAwesomeProps, "color" | "size" | "icon"> {
  icon?: IconDefinition;
  hoverIcon?: IconDefinition;
  color?: string;
  hoverColor?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({
  className,
  color = "var(--lhds-color-ui-500)",
  flip,
  icon,
  hoverIcon,
  pulse,
  rotation,
  hoverColor,
  size = 20,
  spin,
  style,
  transform,
  ...props
}) => {
  const colors = {
    iconColor: color,
    iconColorHover: hoverColor,
  };

  const ref = useRef(null);

  const mouseIsOver = useMouseIsOver(ref);

  if (!icon) {
    return null;
  }

  return (
    <Box justifyContent={"center"} alignItems={"center"} ref={ref}>
      <FontAwesomeIcon
        className={className}
        color={(mouseIsOver && colors.iconColorHover) || colors.iconColor}
        flip={flip}
        icon={(mouseIsOver && hoverIcon) || icon}
        pulse={pulse}
        rotation={rotation}
        spin={spin}
        style={{ fontSize: size, ...style }}
        transform={transform}
        {...props}
      />
    </Box>
  );
};
