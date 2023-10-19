import { Row, Spacing } from "@stenajs-webui/core";
import * as React from "react";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { ButtonGroup } from "./ButtonGroup";
import { FlatButton } from "../buttons/FlatButton";
import {
  stenaAccount,
  stenaAnimals,
  stenaSailingTicket,
  stenaSailingTrain,
  stenaSupport,
} from "../../../icons/generated/CommonIcons";

export default {
  title: "elements/ButtonGroup",
  component: ButtonGroup,
  subcomponents: { SecondaryButton },
};

export const Overview = () => (
  <>
    <Row>
      <ButtonGroup>
        <FlatButton leftIcon={stenaAccount} />
        <FlatButton leftIcon={stenaAnimals} />
        <FlatButton leftIcon={stenaSailingTicket} />
        <FlatButton leftIcon={stenaSailingTrain} />
        <FlatButton leftIcon={stenaSupport} />
      </ButtonGroup>
    </Row>
    <Spacing />
    <Row>
      <ButtonGroup>
        <FlatButton leftIcon={stenaSailingTicket} />
        <FlatButton leftIcon={stenaSailingTrain} />
        <FlatButton leftIcon={stenaSupport} />
      </ButtonGroup>
    </Row>
    <Spacing />
    <Row>
      <ButtonGroup>
        <FlatButton leftIcon={stenaSailingTicket} />
        <FlatButton leftIcon={stenaSailingTrain} />
      </ButtonGroup>
    </Row>
  </>
);
