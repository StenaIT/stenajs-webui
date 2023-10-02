import * as React from "react";
import { Heading, HeadingProps } from "@stenajs-webui/core";

interface NavBarHeadingProps extends HeadingProps {}

export const NavBarHeading: React.FC<NavBarHeadingProps> = (headingProps) => {
  return <Heading whiteSpace={"nowrap"} variant={"h4"} {...headingProps} />;
};
