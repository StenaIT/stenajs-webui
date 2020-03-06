import { Box, Row, useThemeFields } from "@stenajs-webui/core";
import * as React from "react";
import { ReactNode } from "react";
import { Indent } from "@stenajs-webui/core";
import { defaultNavBarTheme, NavBarTheme } from "./NavBarTheme";

export interface NavBarProps {
  theme?: NavBarTheme;
  right?: ReactNode;
}

export const NavBar: React.FC<NavBarProps> = ({
  theme = defaultNavBarTheme,
  children,
  right
}) => {
  const { colors } = useThemeFields(
    {
      colors: {
        backgroundColor: theme.backgroundColor
      }
    },
    [theme]
  );
  return (
    <Box
      width={"100%"}
      height={theme.height}
      background={colors.backgroundColor}
    >
      <Box
        height={theme.height}
        row
        indent={3}
        justifyContent={"space-between"}
      >
        <Row alignItems={"center"}>
          {React.Children.map(children, child => (
            <Indent num={0.5}>{child}</Indent>
          ))}
        </Row>
        <Row alignItems={"center"}>{right}</Row>
      </Box>
    </Box>
  );
};
