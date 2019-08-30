import * as React from "react";
import { TextBase, TextProps } from "../TextBase";

export const StandardText: React.FC<TextProps> = ({
  fontSize = "normal",
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
