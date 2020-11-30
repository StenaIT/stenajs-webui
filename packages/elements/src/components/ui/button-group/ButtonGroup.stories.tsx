import { faAddressBook } from "@fortawesome/free-solid-svg-icons/faAddressBook";
import { faAnchor } from "@fortawesome/free-solid-svg-icons/faAnchor";
import { faEraser } from "@fortawesome/free-solid-svg-icons/faEraser";
import { faRecycle } from "@fortawesome/free-solid-svg-icons/faRecycle";
import { Row } from "@stenajs-webui/core";
import * as React from "react";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { ButtonGroup } from "./ButtonGroup";

export default {
  title: "elements/ButtonGroup",
  component: ButtonGroup,
  subcomponents: { SecondaryButton },
};

export const Overview = () => (
  <>
    <Row>
      <ButtonGroup>
        <SecondaryButton leftIcon={faRecycle} />
        <SecondaryButton leftIcon={faAddressBook} />
        <SecondaryButton leftIcon={faAddressBook} />
        <SecondaryButton leftIcon={faAddressBook} />
        <SecondaryButton leftIcon={faAnchor} />
      </ButtonGroup>
    </Row>
    <Row>
      <ButtonGroup>
        <SecondaryButton leftIcon={faRecycle} />
        <SecondaryButton leftIcon={faAddressBook} />
        <SecondaryButton leftIcon={faAnchor} />
      </ButtonGroup>
    </Row>
    <Row>
      <ButtonGroup>
        <SecondaryButton leftIcon={faEraser} />
        <SecondaryButton leftIcon={faEraser} />
      </ButtonGroup>
    </Row>
  </>
);
