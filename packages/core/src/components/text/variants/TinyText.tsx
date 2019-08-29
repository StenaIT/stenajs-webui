import * as React from "react";
import { TextBase, TextProps } from "../TextBase";

export const TinyText: React.FC<TextProps> = ({
  fontSize = "tiny",
  fontFamily = "primary",
  fontWeight = "standard",
  ...textProps
}) => {
  return (
    <TextBase
      {...textProps}
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
    />
  );
};
