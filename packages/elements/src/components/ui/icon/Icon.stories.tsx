import * as React from "react";
import {
  faBicycle,
  faCog,
  faShip,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Indent, Row, Space, Text } from "@stenajs-webui/core";
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
  <>
    <Row>
      <Text>Normal</Text>
      <Space />
      <Icon icon={faBicycle} />
    </Row>
    <Row>
      <Text>Flipped</Text> <Space />
      <Icon icon={faBicycle} flip={"horizontal"} />
    </Row>
  </>
);

export const VerticalFlip = () => (
  <>
    <Row>
      <Text>Normal</Text>
      <Space />
      <Icon icon={faBicycle} />
    </Row>
    <Row>
      <Text>Flipped</Text> <Space />
      <Icon icon={faBicycle} flip={"vertical"} />
    </Row>
  </>
);

export const WithRotation = () => (
  <Row>
    <Indent>
      <Text>90</Text>
      <Space />
      <Icon icon={faShip} rotation={90} />
    </Indent>
    <Indent>
      <Text>180</Text> <Space />
      <Icon icon={faShip} rotation={180} />
    </Indent>
    <Indent>
      <Text>270</Text> <Space />
      <Icon icon={faShip} rotation={270} />
    </Indent>
  </Row>
);

export const WithTransform = () => (
  <Icon icon={faBicycle} transform={{ flipX: true, rotate: 90 }} />
);
