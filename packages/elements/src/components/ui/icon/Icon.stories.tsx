import {
  faBicycle,
  faCog,
  faShip,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { Indent, Row, Space, StandardText } from "@stenajs-webui/core";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Icon } from "./Icon";

storiesOf("elements/Icon", module)
  .add("default", () => <Icon name={faCog} />)
  .add("with color", () => <Icon name={faCog} color={"#abcdef"} />)
  .add("with spin", () => <Icon name={faSpinner} spin={true} />)
  .add("with pulse", () => <Icon name={faSpinner} pulse={true} />)
  .add("horizontal flip", () => (
    <>
      <Row>
        <StandardText>Normal</StandardText>
        <Space />
        <Icon name={faBicycle} />
      </Row>
      <Row>
        <StandardText>Flipped</StandardText> <Space />
        <Icon name={faBicycle} flip={"horizontal"} />
      </Row>
    </>
  ))
  .add("vertical flip", () => (
    <>
      <Row>
        <StandardText>Normal</StandardText>
        <Space />
        <Icon name={faBicycle} />
      </Row>
      <Row>
        <StandardText>Flipped</StandardText> <Space />
        <Icon name={faBicycle} flip={"vertical"} />
      </Row>
    </>
  ))
  .add("with rotation", () => (
    <Row>
      <Indent>
        <StandardText>90</StandardText>
        <Space />
        <Icon name={faShip} rotation={90} />
      </Indent>
      <Indent>
        <StandardText>180</StandardText> <Space />
        <Icon name={faShip} rotation={180} />
      </Indent>
      <Indent>
        <StandardText>270</StandardText> <Space />
        <Icon name={faShip} rotation={270} />
      </Indent>
    </Row>
  ))
  .add("with transform", () => (
    <Icon name={faBicycle} transform={{ flipX: true, rotate: 90 }} />
  ));
