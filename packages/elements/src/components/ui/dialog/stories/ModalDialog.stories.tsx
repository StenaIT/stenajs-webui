import { Column, Row, Text } from "@stenajs-webui/core";
import { TextInput } from "@stenajs-webui/forms";
import { Story } from "@storybook/react";
import * as React from "react";
import { useCallback, useState } from "react";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { SecondaryButton } from "../../buttons/SecondaryButton";
import { Label } from "../../label/Label";
import { useDialogPromise } from "../UseDialogPromise";
import { useModalDialog } from "../modal/UseModalDialog";

export default {
  title: "elements/ModalDialog",
};

const ModalContent: React.FC = () => {
  const { resolve } = useDialogPromise();

  return (
    <Column spacing={2} indent={2} gap={2}>
      <Text>Some modal content</Text>
      <Row gap={2}>
        <PrimaryButton label={"Close"} onClick={() => resolve()} />
      </Row>
    </Column>
  );
};
export const Overview: Story = () => {
  const [element, { show }] = useModalDialog(ModalContent);

  return (
    <Row>
      <PrimaryButton label={"Open modal"} onClick={() => show()} />
      {element}
    </Row>
  );
};

export const Mobile: Story = () => {
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

export const ResolveReject: Story = () => {
  const [element, { show }] = useModalDialog<EmailFormProps, string>(EmailForm);
  const [email, setEmail] = useState<string | undefined>(undefined);

  const onClickOpen = useCallback(async () => {
    try {
      const result = await show({ currentEmail: email ?? "" });
      if (result != null) {
        setEmail(result);
      }
    } catch (e) {}
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
