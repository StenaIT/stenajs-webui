import {
  faBicycle,
  faCog,
  faShip,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Indent, Row, Space, StandardText } from "@stenajs-webui/core";
import { Icon } from "@stenajs-webui/elements";
import * as React from "react";

export default {
  title: "elements/Icon",
};

export const Default = () => <Icon icon={faCog} />;

export const WithColor = () => <Icon icon={faCog} color={"#abcdef"} />;

export const WithHoverColor = () => (
  <Icon icon={faCog} color={"#abcdef"} hoverColor={"#efcdab"} />
);

export const WithHoverIcon = () => <Icon icon={faCog} hoverIcon={faBicycle} />;

export const WithSpin = () => <Icon icon={faSpinner} spin={true} />;

export const WithPulse = () => <Icon icon={faSpinner} pulse={true} />;

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

export const WithTransform = () => (
  <Icon icon={faBicycle} transform={{ flipX: true, rotate: 90 }} />
);
