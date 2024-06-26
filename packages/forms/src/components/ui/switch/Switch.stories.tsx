import { Column, Heading, Row, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { CSSProperties, useEffect, useState } from "react";
import { Switch, SwitchProps } from "./Switch";
import { StoryFn } from "@storybook/react";

export default {
  title: "forms/Switch",
  component: Switch,
};

export const Demo: StoryFn<SwitchProps> = (props) => <Switch {...props} />;

export const Overview = () => {
  const [enabled, setEnabled] = useState(false);
  const [value, setValue] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setEnabled((v) => !v);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <Column>
      <Heading>Switch</Heading>

      <Space num={2} />

      <Text size={"large"} variant={"bold"}>
        Clickable
      </Text>

      <Space num={2} />

      <Switch value={value} onValueChange={setValue} />

      <Space num={8} />

      <Text size={"large"} variant={"bold"}>
        Transitions
      </Text>

      <Space num={2} />

      <Row alignContent={"flex-start"}>
        <Column justifyContent={"flex-start"}>
          <Text>Value on/off</Text>
          <Switch value={enabled} />

          <Space num={2} />

          <Text>Disabled, checked on/off</Text>
          <Switch value={enabled} disabled />
        </Column>

        <Space num={8} />

        <Column justifyContent={"flex-start"}>
          <Text>Checked, disabled on/off</Text>
          <Switch value disabled={enabled} />

          <Space num={2} />

          <Text>Not checked, disabled on/off</Text>
          <Switch disabled={enabled} />
        </Column>
      </Row>
    </Column>
  );
};

export const Standard = () => {
  const [value, setValue] = useState(false);
  return <Switch value={value} onValueChange={setValue} />;
};

export const CustomActionColor = () => {
  const [value, setValue] = useState(false);
  return (
    <div style={{ "--swui-primary-action-color": "#41ae33" } as CSSProperties}>
      <Switch value={value} onValueChange={setValue} />
    </div>
  );
};

export const Disabled = () => (
  <Column>
    <Switch value disabled />
    <Space />
    <Switch disabled />
  </Column>
);
