import * as React from "react";
import { Text, TextProps } from "../text/Text";

/**
 * @deprecated Please use `Text` instead.
 */
export const SmallerText: React.FC<Omit<TextProps, "variant">> = (props) => {
  return <Text size={"smaller"} {...props} />;
};
