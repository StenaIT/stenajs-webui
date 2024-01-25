import * as React from "react";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import { Column, Row, Text } from "@stenajs-webui/core";
import { PrimaryButton } from "@stenajs-webui/elements";
import { LoadingModal } from "./LoadingModal";
import { useState } from "react";

export default {
  title: "modal/Declarative modals/LoadingModal",
  component: LoadingModal,
};

export const Standard = () => {
  const [open, setOpen] = useState(false);

  return (
    <Column gap={2}>
      <Text>Press Esc to close modal in story.</Text>
      <Row>
        <PrimaryButton
          label={"Show LoadingModal"}
          onClick={() => setOpen(true)}
        />
      </Row>
      {open && <LoadingModal onRequestClose={() => setOpen(false)} shouldCloseOnEsc={true}/>}
    </Column>
  );
};

export const WithHeaderAndIcon = () => {
  const [open, setOpen] = useState(false);
  return (
    <Column gap={2}>
      <Text>Press Esc to close modal in story.</Text>
      <Row>
        <PrimaryButton
          label={"Show LoadingModal"}
          onClick={() => setOpen(true)}
        />
      </Row>
      {open && (
        <LoadingModal
          headerText={"Saving agreement..."}
          headerIconLeft={faLock}
          onRequestClose={() => setOpen(false)}
          shouldCloseOnEsc={true}
        />
      )}
    </Column>
  );
};
