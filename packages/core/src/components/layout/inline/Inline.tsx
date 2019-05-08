import * as React from "react";
import { Box, BoxProps } from "../box/Box";

interface InlineProps extends BoxProps {}

export const Inline: React.FC<InlineProps> = props => {
  return <Box display={"inline-block"} {...props} />;
};
