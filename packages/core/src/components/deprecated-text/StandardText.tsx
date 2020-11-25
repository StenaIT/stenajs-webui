import * as React from "react";
import { Text, TextProps } from "../text/Text";

/**
 * @deprecated Please use `Text` instead.
 */
export const StandardText: React.FC<Omit<TextProps, "size">> = (props) => {
  return <Text size={"normal"} {...props} />;
};
