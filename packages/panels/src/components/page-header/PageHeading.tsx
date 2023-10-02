import * as React from "react";
import { ReactNode } from "react";
import { Heading, HeadingVariant, Row } from "@stenajs-webui/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { CircledIcon } from "@stenajs-webui/elements";

export type PageHeadingVariant = "compact" | "standard" | "relaxed";

interface PageHeadingProps {
  icon?: IconDefinition;
  contentLeft?: ReactNode;
  contentRight?: ReactNode;
  heading: string;
  headingLevel?: HeadingVariant;
  variant?: PageHeadingVariant;
}

export const PageHeading: React.FC<PageHeadingProps> = ({
  icon,
  heading,
  headingLevel = "h2",
  contentLeft,
  contentRight,
}) => (
  <Row alignItems={"center"} gap={2} height={"64px"}>
    <Row alignItems={"center"}>
      <Row width={"64px"} alignItems={"center"}>
        {icon && <CircledIcon icon={icon} />}
      </Row>
      <Heading variant={"h3"} as={headingLevel}>
        {heading}
      </Heading>
    </Row>
    <Row alignItems={"center"}>{contentLeft}</Row>
    <Row style={{ marginLeft: "auto" }} alignItems={"center"}>
      {contentRight}
    </Row>
  </Row>
);
