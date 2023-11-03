import * as React from "react";
import { Column, Row, Text } from "@stenajs-webui/core";
import { CircledIcon } from "./CircledIcon";
import {
  colorListControl,
  disabledControl,
} from "../../../storybook-helpers/storybook-controls";
import {
  stenaCopyDocument,
  stenaLighthouseXl,
  stenaSailingShip,
} from "../../../icons/generated/CommonIcons";
import { stenaBusinessInvoice } from "../../../icons/generated/BusinessIcons";
import { cssColor } from "@stenajs-webui/theme";

export default {
  title: "elements/CircledIcon",
  component: CircledIcon,
  argTypes: {
    color: colorListControl,
    icon: disabledControl,
  },
};

export const Demo = () => {
  const sizes = ["medium", "small", "xl"] as const;

  return (
    <Column gap={4}>
      {sizes.map((size) => (
        <Column gap={2}>
          <Text>{size}</Text>

          <Row gap={2}>
            <Column gap={2} spacing={2} indent={2}>
              {size === "xl" ? (
                <CircledIcon icon={stenaLighthouseXl} size={size} />
              ) : (
                <CircledIcon icon={stenaCopyDocument} size={size} />
              )}
            </Column>

            <Column
              background={cssColor("--lhds-color-ui-200")}
              indent={2}
              spacing={2}
            >
              {size === "xl" ? (
                <CircledIcon
                  icon={stenaLighthouseXl}
                  size={size}
                  backgroundColor={"--lhds-color-ui-50"}
                />
              ) : (
                <CircledIcon
                  icon={stenaCopyDocument}
                  size={size}
                  backgroundColor={"--lhds-color-ui-50"}
                />
              )}
            </Column>
          </Row>
        </Column>
      ))}
    </Column>
  );
};

export const WithColor = () => (
  <Row
    gap={4}
    indent={2}
    spacing={2}
    background={cssColor("--lhds-color-ui-200")}
  >
    <CircledIcon
      icon={stenaCopyDocument}
      backgroundColor={"--lhds-color-ui-50"}
    />
    <CircledIcon
      icon={stenaCopyDocument}
      iconColor={"--modern-red"}
      backgroundColor={"--lhds-color-red-100"}
    />
  </Row>
);

export const WithSpin = () => (
  <CircledIcon icon={stenaBusinessInvoice} spin={true} />
);

export const WithPulse = () => (
  <CircledIcon icon={stenaBusinessInvoice} pulse={true} />
);

export const HorizontalFlip = () => (
  <Column gap={4}>
    <Row gap={2} alignItems={"center"}>
      <Text>Normal</Text>
      <CircledIcon icon={stenaBusinessInvoice} />
    </Row>
    <Row gap={2} alignItems={"center"}>
      <Text>Flipped</Text>
      <CircledIcon icon={stenaBusinessInvoice} flip={"horizontal"} />
    </Row>
  </Column>
);

export const VerticalFlip = () => (
  <Column gap={4}>
    <Row gap={2} alignItems={"center"}>
      <Text>Normal</Text>
      <CircledIcon icon={stenaSailingShip} />
    </Row>
    <Row gap={2} alignItems={"center"}>
      <Text>Flipped</Text>
      <CircledIcon icon={stenaSailingShip} flip={"vertical"} />
    </Row>
  </Column>
);

export const WithRotation = () => (
  <Row gap={2}>
    <Column alignItems={"center"} gap={2}>
      <Text>90</Text>
      <CircledIcon icon={stenaSailingShip} rotation={90} />
    </Column>
    <Column alignItems={"center"} gap={2}>
      <Text>180</Text>
      <CircledIcon icon={stenaSailingShip} rotation={180} />
    </Column>
    <Column alignItems={"center"} gap={2}>
      <Text>270</Text>
      <CircledIcon icon={stenaSailingShip} rotation={270} />
    </Column>
  </Row>
);
