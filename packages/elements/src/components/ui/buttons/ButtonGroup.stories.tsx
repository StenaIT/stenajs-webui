import { faAddressBook } from "@fortawesome/free-solid-svg-icons/faAddressBook";
import { faAnchor } from "@fortawesome/free-solid-svg-icons/faAnchor";
import { faEraser } from "@fortawesome/free-solid-svg-icons/faEraser";
import { faRecycle } from "@fortawesome/free-solid-svg-icons/faRecycle";
import { Row } from "@stenajs-webui/core";
import { ButtonGroup, SecondaryButton } from "@stenajs-webui/elements";
import * as React from "react";

export default {
  title: "elements/Buttons/ButtonGroup"
};

export const Default = () => (
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

Default.story = {
  name: "default"
};
