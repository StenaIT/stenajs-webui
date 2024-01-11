import { Column, Row, Text } from "@stenajs-webui/core";
import { Story } from "@storybook/react";
import * as React from "react";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { useDrawerDialog } from "../drawer/UseDrawerDialog";
import { useDialogPromise } from "../UseDialogPromise";

export default {
  title: "elements/ModalDrawer",
};

const DrawerContent: React.FC = () => {
  const { resolve } = useDialogPromise();

  return (
    <Column spacing={2} indent={2} gap={2}>
      <Text>Some drawer content</Text>
      <Row gap={2}>
        <PrimaryButton label={"Close"} onClick={() => resolve()} />
      </Row>
    </Column>
  );
};
export const Overview: Story = () => {
  const [element, { show }] = useDrawerDialog(DrawerContent, "left");

  return (
    <Column>
      <Row>
        <PrimaryButton label={"Open drawer"} onClick={() => show()} />
      </Row>
      {element}
      <Column alignItems={"center"} spacing={3}>
        <Text>This can still be clicked when drawer is open.</Text>
        <PrimaryButton
          label={"I am still clickable"}
          onClick={() => alert("Click!")}
        />
      </Column>
    </Column>
  );
};

export const FromRight: Story = () => {
  const [element, { show }] = useDrawerDialog(DrawerContent, "right");

  return (
    <Row>
      <PrimaryButton label={"Open drawer"} onClick={() => show()} />
      {element}
    </Row>
  );
};

export const FromTop: Story = () => {
  const [element, { show }] = useDrawerDialog(DrawerContent, "top");

  return (
    <Row>
      <PrimaryButton label={"Open drawer"} onClick={() => show()} />
      {element}
    </Row>
  );
};

export const FromBottom: Story = () => {
  const [element, { show }] = useDrawerDialog(DrawerContent, "bottom");

  return (
    <Row>
      <PrimaryButton label={"Open drawer"} onClick={() => show()} />
      {element}
    </Row>
  );
};
