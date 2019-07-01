import {
  Box,
  SmallText,
  ThemeColorField,
  useThemeFields
} from "@stenajs-webui/core";
import * as React from "react";

export interface BadgeProps {
  color?: ThemeColorField | string;
  textColor?: ThemeColorField | string;
  label?: string | number;
  size?: string | number;
}

export const Badge: React.FC<BadgeProps> = ({
  textColor = "white",
  color = "badgeBg",
  size = "18px",
  label
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        textColor: textColor,
        color: color
      }
    },
    [textColor, color]
  );

  return (
    <Box
      overflow={"hidden"}
      borderRadius={"50%"}
      borderWidth={"0px"}
      background={colors.color}
      width={size}
      height={size}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <SmallText color={colors.textColor}>{label}</SmallText>
    </Box>
  );
};
