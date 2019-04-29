import * as React from "react";
import { useTextTheme } from "../hooks/UseTextTheme";
import { TextBase, TextProps } from "../TextBase";

export const TinyText: React.FC<TextProps> = ({
  fontSize = "tiny",
  fontFamily = "primary",
  fontWeight = "standard",
  ...textProps
}) => {
  const themeTextProps = useTextTheme({ fontSize, fontWeight, fontFamily });
  return <TextBase {...themeTextProps} {...textProps} />;
};
