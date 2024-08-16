import * as React from "react";
import { Heading, HeadingVariant } from "@stenajs-webui/core";

export type ModalHeadingSizeVariant = "medium" | "large";

export interface ModalHeadingProps {
  size?: ModalHeadingSizeVariant;
  children: string;
  headingLevel?: HeadingVariant;
}

export const ModalHeading: React.FC<ModalHeadingProps> = ({
  headingLevel = "h2",
  size = "medium",
  children,
}) => {
  return (
    <Heading variant={size === "medium" ? "h3" : "h1"} as={headingLevel}>
      {children}
    </Heading>
  );
};
