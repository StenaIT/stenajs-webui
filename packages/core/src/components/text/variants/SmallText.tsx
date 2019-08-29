import * as React from "react";
import { TextBase, TextProps } from "../TextBase";

export const SmallText: React.FC<TextProps> = ({
  fontSize = "small",
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
