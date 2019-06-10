import {
  faBicycle,
  faCog,
  faShip,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { Indent, Row, Space, StandardText } from "@stenajs-webui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Icon } from "./Icon";

storiesOf("elements/Icon", module)
  .add("default", () => <Icon icon={faCog} />)
  .add("with color", () => <Icon icon={faCog} color={"#abcdef"} />)
  .add("with hover color", () => (
    <Icon icon={faCog} color={"#abcdef"} hoverColor={"#efcdab"} />
  ))
  .add("with hover icon", () => (
    <Icon icon={faCog} hoverIcon={faBicycle} />
  ))
  .add("with spin", () => <Icon icon={faSpinner} spin={true} />)
  .add("with pulse", () => <Icon icon={faSpinner} pulse={true} />)
  .add("horizontal flip", () => (
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
  ))
  .add("vertical flip", () => (
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
  ))
  .add("with rotation", () => (
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
  ))
  .add("with transform", () => (
    <Icon icon={faBicycle} transform={{ flipX: true, rotate: 90 }} />
  ));
