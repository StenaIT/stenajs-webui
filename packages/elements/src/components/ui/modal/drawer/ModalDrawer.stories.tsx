import { Column, Row, Text } from "@stenajs-webui/core";
import { Story } from "@storybook/react";
import * as React from "react";
import { PrimaryButton } from "../../buttons/PrimaryButton";
import { useModalPromise } from "../UseModalPromise";
import { useModalDrawer } from "./UseModalDrawer";

export default {
  title: "elements/ModalDrawer",
};

const DrawerContent: React.FC = () => {
  const { resolve } = useModalPromise();

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
  const [element, { show }] = useModalDrawer(DrawerContent, "left");

  return (
    <Row>
      <PrimaryButton label={"Open drawer"} onClick={() => show()} />
      {element}
    </Row>
  );
};

export const FromRight: Story = () => {
  const [element, { show }] = useModalDrawer(DrawerContent, "right");

  return (
    <Row>
      <PrimaryButton label={"Open drawer"} onClick={() => show()} />
      {element}
    </Row>
  );
};

export const FromTop: Story = () => {
  const [element, { show }] = useModalDrawer(DrawerContent, "top");

  return (
    <Row>
      <PrimaryButton label={"Open drawer"} onClick={() => show()} />
      {element}
    </Row>
  );
};

export const FromBottom: Story = () => {
  const [element, { show }] = useModalDrawer(DrawerContent, "bottom");

  return (
    <Row>
      <PrimaryButton label={"Open drawer"} onClick={() => show()} />
      {element}
    </Row>
  );
};
