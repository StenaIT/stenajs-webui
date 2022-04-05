import * as React from "react";
import { ReactNode } from "react";
import { Heading, Row } from "@stenajs-webui/core";

export type PageHeadingVariant = "compact" | "default" | "relaxed";

interface PageHeadingProps {
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  heading: string;
  variant?: PageHeadingVariant;
}

const variantToSpacing: Record<PageHeadingVariant, number> = {
  compact: 1,
  default: 2,
  relaxed: 3,
};

export const PageHeading: React.VFC<PageHeadingProps> = ({
  heading,
  variant = "default",
  contentLeft,
  contentRight,
}) => (
  <Row spacing={variantToSpacing[variant]} alignItems={"center"} gap={2}>
    <Heading variant={"h3"}>{heading}</Heading>
    <Row alignItems={"center"}>{contentLeft}</Row>
    <Row style={{ marginLeft: "auto" }} alignItems={"center"}>
      {contentRight}
    </Row>
  </Row>
);
