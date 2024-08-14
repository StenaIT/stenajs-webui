import * as React from "react";
import { useDialogPromise } from "../dialog/UseDialogPromise";
import { ModalBody } from "./ModalBody";
import { Row } from "@stenajs-webui/core";
import { PrimaryButton, SecondaryButton } from "@stenajs-webui/elements";
import { StoryFn } from "@storybook/react";
import { useModalDialog } from "../dialog/modal/UseModalDialog";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";
import { LabelledTextInput } from "@stenajs-webui/forms";
import { ModalContainer } from "./ModalContainer";

export default {
  title: "modal/Building blocks/ModalFooter",
};

const ModalContent: React.FC<{ sticky: boolean }> = ({ sticky }) => {
  const { resolve, reject } = useDialogPromise();

  return (
    <ModalContainer>
      <ModalBody minHeight={sticky ? undefined : "400px"}>
        <ModalHeader heading={"Edit user"} onClickClose={reject} />
        <LabelledTextInput label={"E-mail"} />
        <LabelledTextInput label={"First name"} />
        {sticky && (
          <>
            <LabelledTextInput label={"Last name"} />
            <LabelledTextInput label={"Address"} />
            <LabelledTextInput label={"Zip code"} />
            <LabelledTextInput label={"City"} />
          </>
        )}
      </ModalBody>
      <ModalFooter sticky={sticky}>
        <Row gap={2} spacing={2}>
          <SecondaryButton label={"Cancel"} onClick={() => reject()} />
          <PrimaryButton label={"Cancel"} onClick={() => resolve()} />
        </Row>
      </ModalFooter>
    </ModalContainer>
  );
};

export const Sticky: StoryFn = () => {
  const [element, { show }] = useModalDialog(ModalContent);

  return (
    <Row>
      <PrimaryButton
        label={"Open modal"}
        onClick={() => show({ sticky: true })}
      />
      {element}
    </Row>
  );
};

export const NotSticky: StoryFn = () => {
  const [element, { show }] = useModalDialog(ModalContent);

  return (
    <Row>
      <PrimaryButton
        label={"Open modal"}
        onClick={() => show({ sticky: false })}
      />
      {element}
    </Row>
  );
};
