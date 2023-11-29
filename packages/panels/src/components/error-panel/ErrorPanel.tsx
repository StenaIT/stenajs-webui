import {
  Box,
  Column,
  Heading,
  HeadingProps,
  Space,
  Text,
} from "@stenajs-webui/core";
import {
  Card,
  CardBody,
  CircledIcon,
  stenaTripFerryXl,
  XlIcon,
} from "@stenajs-webui/elements";
import * as React from "react";
import { PropsWithChildren, ReactNode } from "react";

export interface ErrorPanelProps extends PropsWithChildren {
  text?: string;
  heading?: string;
  buttons?: ReactNode;
  icon?: XlIcon;
  headingLevel?: HeadingProps["as"];
}

export const ErrorPanel: React.FC<ErrorPanelProps> = ({
  text,
  heading,
  children,
  buttons,
  icon = stenaTripFerryXl,
  headingLevel = "h3",
}) => {
  const activeText =
    !text && !heading ? "Something unexpected happened." : text;

  return (
    <Card>
      <CardBody>
        <Column spacing={1} gap={3} alignItems={"center"}>
          <Column alignItems={"center"}>
            <Space num={1} />
            <CircledIcon icon={icon} size={"xl"} />
          </Column>
          {heading && <Heading as={headingLevel}>{heading}</Heading>}
          {activeText && <Text>{activeText}</Text>}
          {children}
          {buttons && (
            <Box>
              <Space num={2} />
              {buttons}
            </Box>
          )}
        </Column>
      </CardBody>
    </Card>
  );
};
