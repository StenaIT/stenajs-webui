import { Column, Row, Text } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import { StoryFn } from "@storybook/react";
import * as React from "react";
import { useCallback, useState } from "react";
import { Label, PrimaryButton, SecondaryButton } from "@stenajs-webui/elements";
import { useDialogPromise } from "../UseDialogPromise";
import { useModalDialog } from "./UseModalDialog";
import { cssColor } from "@stenajs-webui/theme";
import { useAlertDialog } from "../alert/UseAlertDialog";
import { ModalBody } from "../../building-blocks/ModalBody";

export default {
  title: "modal/Dialog/ModalDialog",
};

const ModalContent: React.FC = () => {
  const { resolve } = useDialogPromise();

  return (
    <ModalBody>
      <Text>Some modal content</Text>
      <Row gap={2}>
        <PrimaryButton label={"Close"} onClick={() => resolve()} />
      </Row>
    </ModalBody>
  );
};

export const Overview: StoryFn = () => {
  const [element, { show }] = useModalDialog(ModalContent);

  return (
    <Row>
      <PrimaryButton label={"Open modal"} onClick={() => show()} />
      {element}
    </Row>
  );
};

export const Mobile: StoryFn = () => {
  const [element, { show }] = useModalDialog(ModalContent);

  return (
    <Row>
      <PrimaryButton label={"Open modal"} onClick={() => show()} />
      {element}
    </Row>
  );
};

Mobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};

export const MobileWithBackground: StoryFn = () => {
  const [element, { show }] = useModalDialog(ModalContent, {
    dialogStyle: { background: cssColor("--himmel") },
  });

  return (
    <Row>
      <PrimaryButton label={"Open modal"} onClick={() => show()} />
      {element}
    </Row>
  );
};

MobileWithBackground.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};

interface EmailFormProps {
  currentEmail: string;
}

const EmailForm: React.FC<EmailFormProps> = ({ currentEmail }) => {
  const [text, setText] = useState(currentEmail);
  const { resolve, reject } = useDialogPromise<string>();

  return (
    <Column spacing={2} indent={2} gap={2}>
      <Text>Some modal content</Text>
      <Label text={"E-mail"}>
        <TextInput value={text} onValueChange={setText} />
      </Label>
      <Row gap={2}>
        <PrimaryButton label={"Send"} onClick={() => resolve(text)} />
        <SecondaryButton label={"Cancel"} onClick={() => reject()} />
      </Row>
    </Column>
  );
};

export const ResolveReject: StoryFn = () => {
  const [element, { show }] = useAlertDialog<EmailFormProps, string>(EmailForm);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const onClickOpen = useCallback(async () => {
    try {
      const result = await show({ currentEmail: email ?? "" });
      if (result != null) {
        setEmail(result);
      }
    } catch {
      /* empty */
    }
  }, [email, show]);

  return (
    <Column gap={2}>
      <Row>
        <PrimaryButton label={"Open form"} onClick={onClickOpen} />
      </Row>
      <Text>Current e-mail: {email ?? "Not set"}</Text>
      {element}
    </Column>
  );
};
