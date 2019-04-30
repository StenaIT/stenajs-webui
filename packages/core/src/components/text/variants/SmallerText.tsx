import * as React from "react";
import { useTextTheme } from "../hooks/UseTextTheme";
import { TextBase, TextProps } from "../TextBase";

export const SmallerText: React.FC<TextProps> = ({
  fontSize = "smaller",
  fontFamily = "primary",
  fontWeight = "standard",
  ...textProps
}) => {
  const themeTextProps = useTextTheme({ fontSize, fontWeight, fontFamily });
  return <TextBase {...themeTextProps} {...textProps} />;
};


const e = <Button color={'#ffffff'}/>
