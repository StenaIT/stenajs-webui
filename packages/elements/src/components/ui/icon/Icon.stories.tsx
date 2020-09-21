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

Default.storyName = "default";

export const WithColor = () => <Icon icon={faCog} color={"#abcdef"} />;

WithColor.storyName = "with color";

export const WithHoverColor = () => (
  <Icon icon={faCog} color={"#abcdef"} hoverColor={"#efcdab"} />
);

WithHoverColor.storyName = "with hover color";

export const WithHoverIcon = () => <Icon icon={faCog} hoverIcon={faBicycle} />;

WithHoverIcon.storyName = "with hover icon";

export const WithSpin = () => <Icon icon={faSpinner} spin={true} />;

WithSpin.storyName = "with spin";

export const WithPulse = () => <Icon icon={faSpinner} pulse={true} />;

WithPulse.storyName = "with pulse";

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

HorizontalFlip.storyName = "horizontal flip";

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

VerticalFlip.storyName = "vertical flip";

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

WithRotation.storyName = "with rotation";

export const WithTransform = () => (
  <Icon icon={faBicycle} transform={{ flipX: true, rotate: 90 }} />
);

WithTransform.storyName = "with transform";
