import {
  faBicycle,
  faCog,
  faShip,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { Indent, Row, Space, StandardText } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";

export default {
  title: "elements/Icon"
};

export const Default = () => <Icon icon={faCog} />;

Default.story = {
  name: "default"
};

export const WithColor = () => <Icon icon={faCog} color={"#abcdef"} />;

WithColor.story = {
  name: "with color"
};

export const WithHoverColor = () => (
  <Icon icon={faCog} color={"#abcdef"} hoverColor={"#efcdab"} />
);

WithHoverColor.story = {
  name: "with hover color"
};

export const WithHoverIcon = () => <Icon icon={faCog} hoverIcon={faBicycle} />;

WithHoverIcon.story = {
  name: "with hover icon"
};

export const WithSpin = () => <Icon icon={faSpinner} spin={true} />;

WithSpin.story = {
  name: "with spin"
};

export const WithPulse = () => <Icon icon={faSpinner} pulse={true} />;

WithPulse.story = {
  name: "with pulse"
};

export const HorizontalFlip = () => (
  <>
    <Row>
      <StandardText>Normal</StandardText>
      <Space />
      <Icon icon={faBicycle} />
    </Row>
    <Row>
      <StandardText>Flipped</StandardText> <Space />
      <Icon icon={faBicycle} flip={"horizontal"} />
    </Row>
  </>
);

HorizontalFlip.story = {
  name: "horizontal flip"
};

export const VerticalFlip = () => (
  <>
    <Row>
      <StandardText>Normal</StandardText>
      <Space />
      <Icon icon={faBicycle} />
    </Row>
    <Row>
      <StandardText>Flipped</StandardText> <Space />
      <Icon icon={faBicycle} flip={"vertical"} />
    </Row>
  </>
);

VerticalFlip.story = {
  name: "vertical flip"
};

export const WithRotation = () => (
  <Row>
    <Indent>
      <StandardText>90</StandardText>
      <Space />
      <Icon icon={faShip} rotation={90} />
    </Indent>
    <Indent>
      <StandardText>180</StandardText> <Space />
      <Icon icon={faShip} rotation={180} />
    </Indent>
    <Indent>
      <StandardText>270</StandardText> <Space />
      <Icon icon={faShip} rotation={270} />
    </Indent>
  </Row>
);

WithRotation.story = {
  name: "with rotation"
};

export const WithTransform = () => (
  <Icon icon={faBicycle} transform={{ flipX: true, rotate: 90 }} />
);

WithTransform.story = {
  name: "with transform"
};
