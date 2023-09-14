import * as React from "react";
import {
  faBicycle,
  faCog,
  faShip,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Column, Row, Text, Txt } from "@stenajs-webui/core";
import { CircledIcon, CircledIconProps } from "./CircledIcon";
import { Story } from "@storybook/react";
import {
  colorListControl,
  disabledControl,
} from "../../../storybook-helpers/storybook-controls";

export default {
  title: "elements/CircledIcon",
  component: CircledIcon,
  argTypes: {
    color: colorListControl,
    icon: disabledControl,
  },
};

export const Demo: Story<CircledIconProps> = (props) => (
  <CircledIcon {...props} icon={faCog} />
);

export const WithColor = () => (
  <CircledIcon icon={faCog} iconColor={"--modern-red"} />
);

export const WithSpin = () => <CircledIcon icon={faSpinner} spin={true} />;

export const WithPulse = () => <CircledIcon icon={faSpinner} pulse={true} />;

export const HorizontalFlip = () => (
  <Column gap={4}>
    <Row gap={2} alignItems={"center"}>
      <Text>Normal</Text>
      <CircledIcon icon={faBicycle} />
    </Row>
    <Row gap={2} alignItems={"center"}>
      <Text>Flipped</Text>
      <CircledIcon icon={faBicycle} flip={"horizontal"} />
    </Row>
  </Column>
);

export const VerticalFlip = () => (
  <Column gap={4}>
    <Row gap={2} alignItems={"center"}>
      <Text>Normal</Text>
      <CircledIcon icon={faBicycle} />
    </Row>
    <Row gap={2} alignItems={"center"}>
      <Text>Flipped</Text>
      <CircledIcon icon={faBicycle} flip={"vertical"} />
    </Row>
  </Column>
);

export const WithRotation = () => (
  <Row gap={2}>
    <Column alignItems={"center"} gap={2}>
      <Text>90</Text>
      <CircledIcon icon={faShip} rotation={90} />
    </Column>
    <Column alignItems={"center"} gap={2}>
      <Text>180</Text>
      <CircledIcon icon={faShip} rotation={180} />
    </Column>
    <Column alignItems={"center"} gap={2}>
      <Text>270</Text>
      <CircledIcon icon={faShip} rotation={270} />
    </Column>
  </Row>
);

export const WithTransform = () => (
  <CircledIcon icon={faBicycle} transform={{ flipX: true, rotate: 90 }} />
);

export const WithDisplay = () => (
  <>
    <p>
      <Txt>This </Txt>
      <CircledIcon icon={faBicycle} display={"inline"} />
      <Txt> is inline</Txt>
    </p>
    <p style={{ display: "inline-block" }}>
      <Txt>This </Txt>
      <CircledIcon icon={faBicycle} />
      <Txt> is not inline</Txt>
    </p>
  </>
);
