import * as React from "react";
import { TextBase, TextProps } from "../TextBase";

export const SmallerText: React.FC<TextProps> = ({
  fontSize = "smaller",
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
