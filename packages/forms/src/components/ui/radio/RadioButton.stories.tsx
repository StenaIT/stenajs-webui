import * as React from "react";
import { CSSProperties, useEffect, useState } from "react";
import { Column, Heading, Row, Space, Text } from "@stenajs-webui/core";
import { RadioButtonWithLabel } from "./RadioButtonWithLabel";
import { RadioButton, RadioButtonProps } from "./RadioButton";
import { StoryFn } from "@storybook/react";
import { disabledControl } from "../../../storybook-helpers/storybook-controls";

export default {
  title: "forms/RadioButton",
  component: RadioButton,
  argTypes: {
    checked: {
      control: "boolean",
    },
    inputRef: disabledControl,
  },
  args: {
    name: "somename",
  },
};

export const Demo: StoryFn<RadioButtonProps> = (props) => (
  <RadioButton {...props} />
);

export const Overview = () => {
  const [selected, setSelected] = useState("");
  const [selectedSmall, setSelectedSmall] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setIsEnabled((v) => !v);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <Column>
      <Heading>RadioButton</Heading>

      <Space num={2} />

      <Text size={"large"} variant={"bold"}>
        Clickable
      </Text>

      <Space num={2} />

      <RadioButtonWithLabel
        label={"Boat"}
        name={"travel"}
        value={"boat"}
        checked={selected === "boat"}
        onValueChange={setSelected}
      />

      <Space />

      <RadioButtonWithLabel
        label={"Plane"}
        name={"travel"}
        value={"plane"}
        checked={selected === "plane"}
        onValueChange={setSelected}
      />

      <Space />

      <RadioButtonWithLabel
        label={"Car"}
        name={"travel"}
        value={"car"}
        checked={selected === "car"}
        onValueChange={setSelected}
      />

      <Space />

      <RadioButtonWithLabel
        label={"Walk"}
        name={"travel"}
        value={"walk"}
        checked={selected === "walk"}
        onValueChange={setSelected}
        disabled
      />

      <Space num={3} />

      <RadioButtonWithLabel
        size={"small"}
        label={"Today"}
        name={"day"}
        value={"today"}
        checked={selectedSmall === "today"}
        onValueChange={setSelectedSmall}
      />

      <Space />

      <RadioButtonWithLabel
        size={"small"}
        label={"Tomorrow"}
        name={"day"}
        value={"tomorrow"}
        checked={selectedSmall === "tomorrow"}
        onValueChange={setSelectedSmall}
      />

      <Space />

      <RadioButtonWithLabel
        size={"small"}
        label={"Yesterday"}
        name={"day"}
        value={"yesterday"}
        checked={selectedSmall === "yesterday"}
        onValueChange={setSelectedSmall}
        disabled
      />

      <Space num={8} />

      <Text size={"large"} variant={"bold"}>
        Transitions
      </Text>

      <Space num={2} />

      <Row alignContent={"flex-start"}>
        <Column justifyContent={"flex-start"}>
          <Text>Checked on/off</Text>
          <RadioButton checked={isEnabled} />

          <Space num={2} />

          <Text>Disabled, checked on/off</Text>
          <RadioButton checked={isEnabled} disabled />
        </Column>

        <Space num={8} />

        <Column justifyContent={"flex-start"}>
          <Text>Checked, disabled on/off</Text>
          <RadioButton checked disabled={isEnabled} />

          <Space num={2} />

          <Text>Not checked, disabled on/off</Text>
          <RadioButton disabled={isEnabled} />
        </Column>
      </Row>
    </Column>
  );
};

export const CustomActionColorOnMultiple = () => {
  const style = {
    "--swui-radiobutton-checked-bg-color": "#41ae33",
  } as CSSProperties;
  return (
    <Column>
      <RadioButton name={"testing1"} style={style} />
      <Space />
      <RadioButton name={"testing2"} style={style} />
      <Space />
      <RadioButton name={"testing3"} style={style} />
    </Column>
  );
};

export const CustomCheckedBgColorOnSingle = () => (
  <Column>
    <RadioButton
      name={"testing"}
      style={
        { "--swui-radiobutton-checked-bg-color": "#41ae33" } as CSSProperties
      }
    />
    <Space />
    <RadioButton name={"testing"} />
  </Column>
);
