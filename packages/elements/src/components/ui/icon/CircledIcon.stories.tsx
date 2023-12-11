import * as React from "react";
import { Column, Row, Text } from "@stenajs-webui/core";
import { CircledIcon } from "./CircledIcon";
import {
  colorListControl,
  disabledControl,
} from "../../../storybook-helpers/storybook-controls";
import {
  stenaCopyDocument,
  stenaSailingShip,
} from "../../../icons/generated/CommonIcons";
import { stenaBusinessInvoice } from "../../../icons/generated/BusinessIcons";
import { cssColor } from "@stenajs-webui/theme";
import {
  stenaLighthouseXl,
  stenaTripFerryXl,
} from "../../../icons/generated/XlIcons";
import { MediumIcon, XlIcon } from "../../../icons/IconSizes";

export default {
  title: "elements/CircledIcon",
  component: CircledIcon,
  argTypes: {
    color: colorListControl,
    icon: disabledControl,
  },
};

export const Demo = () => {
  const normalIcons = [stenaCopyDocument];
  const xlIcons = [stenaLighthouseXl, stenaTripFerryXl];

  return (
    <Column gap={4}>
      <Column gap={2}>
        <Text>Small</Text>
        <Row gap={2}>
          <Row gap={2} spacing={2} indent={2}>
            {normalIcons.map((icon) => (
              <DemoRow icon={icon} iconSize={"small"} />
            ))}
          </Row>
        </Row>
      </Column>

      <Column gap={2}>
        <Text>Medium</Text>
        <Row gap={2}>
          <Row gap={2} spacing={2} indent={2}>
            {normalIcons.map((icon) => (
              <DemoRow icon={icon} iconSize={"medium"} />
            ))}
          </Row>
        </Row>
      </Column>

      <Column gap={2}>
        <Text>XL</Text>
        <Row gap={2}>
          <Row gap={2} spacing={2} indent={2}>
            {xlIcons.map((icon) => (
              <DemoRow icon={icon} iconSize={"xl"} />
            ))}
          </Row>
        </Row>
      </Column>
    </Column>
  );
};

const DemoRow: React.FC<
  | { icon: XlIcon; iconSize: "xl" }
  | { icon: MediumIcon; iconSize: "medium" | "small" }
> = ({ icon, iconSize }) => {
  return (
    <Row>
      {iconSize === "xl" ? (
        <>
          <Column indent={2} spacing={2}>
            <CircledIcon icon={icon} size={iconSize} />
          </Column>
          <Column
            indent={2}
            spacing={2}
            background={cssColor("--lhds-color-ui-200")}
          >
            <CircledIcon icon={icon} size={iconSize} variant={"whiteBg"} />
          </Column>
        </>
      ) : (
        <>
          <Column indent={2} spacing={2}>
            <CircledIcon icon={icon} size={iconSize} />
          </Column>
          <Column
            background={cssColor("--lhds-color-ui-200")}
            indent={2}
            spacing={2}
          >
            <CircledIcon icon={icon} size={iconSize} variant={"whiteBg"} />
          </Column>
        </>
      )}
    </Row>
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
