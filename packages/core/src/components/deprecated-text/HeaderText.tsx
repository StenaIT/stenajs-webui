import * as React from "react";
import { Heading, HeadingProps } from "../heading/Heading";

/**
 * @deprecated Please use `Heading` instead.
 */
export const HeaderText: React.FC<Omit<HeadingProps, "variant">> = (props) => {
  return <Heading variant={"h2"} {...props} />;
};
