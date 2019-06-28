import * as React from "react";
import { useTextTheme } from "../hooks/UseTextTheme";
import { TextBase, TextProps } from "../TextBase";

const H1 = TextBase.withComponent("h1");

export const HeaderText: React.FC<TextProps> = ({
  fontSize = "huge",
  fontFamily = "primary",
  fontWeight = "standard",
  ...textProps
}) => {
  const themeTextProps = useTextTheme({ fontSize, fontWeight, fontFamily });
  return <H1 {...themeTextProps} {...textProps} />;
};
