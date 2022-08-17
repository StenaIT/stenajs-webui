import * as React from "react";
import { ReactNode } from "react";
import { Heading, Row } from "@stenajs-webui/core";

export type PageHeadingVariant = "compact" | "standard" | "relaxed";

interface PageHeadingProps {
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  heading: string | ReactNode;
  variant?: PageHeadingVariant;
}

const variantToSpacing: Record<PageHeadingVariant, number> = {
  compact: 1,
  standard: 1.5,
  relaxed: 2,
};

export const PageHeading: React.VFC<PageHeadingProps> = ({
  heading,
  variant = "standard",
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
