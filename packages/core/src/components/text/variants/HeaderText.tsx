import * as React from "react";
import { TextBase, TextProps } from "../TextBase";

export const HeaderText: React.FC<TextProps> = ({
  fontSize = "huge",
  fontFamily = "primary",
  fontWeight = "standard",
  ...textProps
}) => {
  return (
    <TextBase
      {...textProps}
      element={"h1"}
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
    />
  );
};
