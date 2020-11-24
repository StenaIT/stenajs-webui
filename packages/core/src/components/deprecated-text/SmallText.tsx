import * as React from "react";
import { Text, TextProps } from "../text/Text";

/**
 * @deprecated Please use `Text` instead.
 */
export const SmallText: React.FC<Omit<TextProps, "variant">> = (props) => {
  return <Text size={"small"} {...props} />;
};
