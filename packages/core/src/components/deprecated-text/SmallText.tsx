import * as React from "react";
import { Text, TextProps } from "../text/Text";

/**
 * @deprecated Please use `Text` instead.
 */
export const SmallText: React.FC<Omit<TextProps, "size">> = (props) => {
  return <Text size={"small"} {...props} />;
};
