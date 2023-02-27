import * as React from "react";
import { ReactNode } from "react";
import { Heading, HeadingVariant, Row } from "@stenajs-webui/core";

export type PageHeadingVariant = "compact" | "standard" | "relaxed";

interface PageHeadingProps {
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  heading: string;
  headingLevel?: HeadingVariant;
  variant?: PageHeadingVariant;
}

const variantToSpacing: Record<PageHeadingVariant, number> = {
  compact: 1,
  standard: 1.5,
  relaxed: 2,
};

export const PageHeading: React.FC<PageHeadingProps> = ({
  heading,
  headingLevel = "h1",
  variant = "standard",
  contentLeft,
  contentRight,
}) => (
  <Row spacing={variantToSpacing[variant]} alignItems={"center"} gap={2}>
    <Heading variant={"h3"} as={headingLevel}>
      {heading}
    </Heading>
    <Row alignItems={"center"}>{contentLeft}</Row>
    <Row style={{ marginLeft: "auto" }} alignItems={"center"}>
      {contentRight}
    </Row>
  </Row>
);
