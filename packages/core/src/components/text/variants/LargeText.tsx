import * as React from "react";
import { TextBase, TextProps } from "../TextBase";

export const LargeText: React.FC<TextProps> = ({
  fontSize = "large",
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
