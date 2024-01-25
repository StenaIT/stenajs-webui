import * as React from "react";
import { useState } from "react";
import { Text } from "@stenajs-webui/core";
import { PrimaryButton, stenaBell } from "@stenajs-webui/elements";
import { Modal } from "./Modal";
import { ModalBody } from "../../building-blocks/ModalBody";
import { InfoAlert } from "../../ready-made-modals/InfoAlert";

export default {
  title: "modal/Declarative modals/Modal",
  component: Modal,
};

const heading = "Session has expired";
const text =
  "Since you've been inactive for more than 20 minutes, your session has expired. Restart and make a new booking.";

export const Standard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "inline-block" }}>
      <PrimaryButton label={"Open modal"} onClick={() => setOpen(true)} />
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        <ModalBody>
          <Text>Some modal stuff</Text>
          <PrimaryButton label={"Close"} onClick={() => setOpen(false)} />
        </ModalBody>
      </Modal>
    </div>
  );
};

export const WithInfoAlert = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "inline-block" }}>
      <PrimaryButton label={"Open modal"} onClick={() => setOpen(true)} />
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        <InfoAlert
          minWidth={"384px"}
          heading={heading}
          text={text}
          icon={stenaBell}
          buttons={
            <PrimaryButton
              size={"larger"}
              label={"Close"}
              onClick={() => setOpen(false)}
            />
          }
        />
      </Modal>
    </div>
  );
};
