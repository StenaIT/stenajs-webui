import * as React from "react";
import { useTheme } from "../../../theme/hooks/UseTheme";
import { Box, BoxProps } from "../../layout/box/Box";

interface BorderProps extends BoxProps {}

export const Border: React.FC<BorderProps> = ({
  borderWidth,
  borderStyle,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Box
      borderWidth={borderWidth || "1px"}
      borderStyle={borderStyle || "solid"}
      borderColor={theme.colors.primaryText}
      {...props}
    />
  );
};
