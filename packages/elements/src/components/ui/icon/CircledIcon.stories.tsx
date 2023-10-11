import * as React from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Column, Row, Text } from "@stenajs-webui/core";
import {
  CircledIcon,
  CircledIconProps,
  CircledIconSizeVariant,
} from "./CircledIcon";
import { Story } from "@storybook/react";
import {
  colorListControl,
  disabledControl,
} from "../../../storybook-helpers/storybook-controls";
import {
  stenaBusinessInvoice,
  stenaCopyDocument,
  stenaSailingShip,
} from "../../../icons/ui/IconsUi";

export default {
  title: "elements/CircledIcon",
  component: CircledIcon,
  argTypes: {
    color: colorListControl,
    icon: disabledControl,
  },
};

export const Demo: Story<CircledIconProps> = (props) => (
  <CircledIcon {...props} icon={stenaCopyDocument} />
);

export const WithColor = () => (
  <CircledIcon
    icon={stenaCopyDocument}
    iconColor={"--modern-red"}
    backgroundColor={"--lhds-color-red-100"}
  />
);

export const Sizes = () => {
  const sizes: Array<CircledIconSizeVariant> = ["medium", "small", "smaller"];

  return (
    <Column gap={4}>
      {sizes.map((size) => (
        <Column gap={2}>
          <Text>{size}</Text>
          <CircledIcon icon={stenaCopyDocument} size={size} />
        </Column>
      ))}
    </Column>
  );
};

export const WithSpin = () => <CircledIcon icon={faSpinner} spin={true} />;

export const WithPulse = () => <CircledIcon icon={faSpinner} pulse={true} />;

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
