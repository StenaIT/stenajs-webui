import * as React from "react";
import { useDialogPromise } from "../dialog/UseDialogPromise";
import { ModalBody } from "./ModalBody";
import { Row } from "@stenajs-webui/core";
import { PrimaryButton, SecondaryButton } from "@stenajs-webui/elements";
import { StoryFn } from "@storybook/react";
import { useModalDialog } from "../dialog/modal/UseModalDialog";
import { ModalHeader } from "./ModalHeader";
import { LabelledTextInput } from "@stenajs-webui/forms";
import { ModalContainer } from "./ModalContainer";
import { ModalActionButtons } from "./ModalActionButtons";

export default {
  title: "modal/Building blocks/ModalActionButtons",
};

const ModalContent: React.FC = () => {
  const { resolve, reject } = useDialogPromise();

  return (
    <ModalContainer>
      <ModalBody>
        <ModalHeader heading={"Edit user"} onClickClose={reject} />
        <LabelledTextInput label={"E-mail"} />
        <LabelledTextInput label={"First name"} />
        <ModalActionButtons
          buttons={
            <>
              <SecondaryButton label={"Cancel"} onClick={() => reject()} />
              <PrimaryButton label={"Save"} onClick={() => resolve()} />
            </>
          }
        />
      </ModalBody>
    </ModalContainer>
  );
};

export const Demo: StoryFn = () => {
  const [element, { show }] = useModalDialog(ModalContent);

  return (
    <Row>
      <PrimaryButton label={"Open modal"} onClick={() => show()} />
      {element}
    </Row>
  );
};
