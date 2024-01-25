import * as React from "react";
import { Row } from "@stenajs-webui/core";
import type { Meta, StoryObj } from "@storybook/react";
import { PrimaryButton } from "@stenajs-webui/elements";
import { InfoAlert } from "./InfoAlert";
import { stenaBell } from "@stenajs-webui/elements";
import { useDialogPromise } from "../dialog/UseDialogPromise";
import { useAlertDialog } from "../dialog/alert/UseAlertDialog";
import { SecondaryButton } from "@stenajs-webui/elements";

const meta: Meta<typeof InfoAlert> = {
  title: "modal/Ready-made modals/InfoAlert",
  component: InfoAlert,
};

export default meta;

type Story = StoryObj<typeof InfoAlert>;

const heading = "Session has expired";
const text =
  "Since you've been inactive for more than 20 minutes, your session has expired. Restart and make a new booking.";

export const OneButton: Story = {
  render: () => <OneButtonDemo />,
};

export const TwoButtons: Story = {
  render: () => <TwoButtonsDemo />,
};

const OneButtonAlert: React.FC = () => {
  const { resolve } = useDialogPromise();

  return (
    <InfoAlert
      maxWidth={"384px"}
      onRequestClose={resolve}
      heading={heading}
      text={text}
      icon={stenaBell}
      buttons={<PrimaryButton size={"larger"} label={"Restart"} />}
    />
  );
};

const OneButtonDemo = () => {
  const [element, { show }] = useAlertDialog(OneButtonAlert);

  return (
    <Row>
      <PrimaryButton label={"Open InfoAlert"} onClick={() => show()} />
      {element}
    </Row>
  );
};

const TwoButtonsAlert: React.FC = () => {
  const { resolve } = useDialogPromise();

  return (
    <InfoAlert
      maxWidth={"484px"}
      onRequestClose={resolve}
      heading={heading}
      text={text}
      icon={stenaBell}
      buttons={
        <>
          <SecondaryButton size={"larger"} label={"Cancel"} />
          <PrimaryButton size={"larger"} label={"Restart"} />
        </>
      }
    />
  );
};
const TwoButtonsDemo = () => {
  const [element, { show }] = useAlertDialog(TwoButtonsAlert);

  return (
    <Row>
      <PrimaryButton label={"Open InfoAlert"} onClick={() => show()} />
      {element}
    </Row>
  );
};
