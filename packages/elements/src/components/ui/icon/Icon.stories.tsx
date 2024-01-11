import * as React from "react";
import {
  faBicycle,
  faCog,
  faShip,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Column, Row, Text, Txt } from "@stenajs-webui/core";
import { Icon, IconProps } from "./Icon";
import { Story } from "@storybook/react";
import {
  colorListControl,
  disabledControl,
} from "../../../storybook-helpers/storybook-controls";

export default {
  title: "elements/Icon",
  component: Icon,
  argTypes: {
    color: colorListControl,
    icon: disabledControl,
  },
};

export const Demo: Story<IconProps> = (props) => (
  <Icon {...props} icon={faCog} />
);

export const WithColor = () => <Icon icon={faCog} color={"red"} />;

export const WithSpin = () => <Icon icon={faSpinner} spin={true} />;

export const WithPulse = () => <Icon icon={faSpinner} pulse={true} />;

export const HorizontalFlip = () => (
  <Column gap={4}>
    <Row gap={2} alignItems={"center"}>
      <Text>Normal</Text>
      <Icon icon={faBicycle} />
    </Row>
    <Row gap={2} alignItems={"center"}>
      <Text>Flipped</Text>
      <Icon icon={faBicycle} flip={"horizontal"} />
    </Row>
  </Column>
);

export const VerticalFlip = () => (
  <Column gap={4}>
    <Row gap={2} alignItems={"center"}>
      <Text>Normal</Text>
      <Icon icon={faBicycle} />
    </Row>
    <Row gap={2} alignItems={"center"}>
      <Text>Flipped</Text>
      <Icon icon={faBicycle} flip={"vertical"} />
    </Row>
  </Column>
);

export const WithRotation = () => (
  <Row gap={2}>
    <Column alignItems={"center"} gap={2}>
      <Text>90</Text>
      <Icon icon={faShip} rotation={90} />
    </Column>
    <Column alignItems={"center"} gap={2}>
      <Text>180</Text>
      <Icon icon={faShip} rotation={180} />
    </Column>
    <Column alignItems={"center"} gap={2}>
      <Text>270</Text>
      <Icon icon={faShip} rotation={270} />
    </Column>
  </Row>
);

export const WithTransform = () => (
  <Icon icon={faBicycle} transform={{ flipX: true, rotate: 90 }} />
);

export const WithDisplay = () => (
  <>
    <p>
      <Txt>This </Txt>
      <Icon icon={faBicycle} display={"inline"} />
      <Txt> is inline</Txt>
    </p>
    <p style={{ display: "inline-block" }}>
      <Txt>This </Txt>
      <Icon icon={faBicycle} />
      <Txt> is not inline</Txt>
    </p>
  </>
);
