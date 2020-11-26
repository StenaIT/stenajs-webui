import { Column, Heading, Row, Space, Text } from "@stenajs-webui/core";
import * as knobs from "@storybook/addon-knobs";
import * as React from "react";
import { useEffect, useState } from "react";
import { Checkbox, CheckboxProps } from "./Checkbox";
import { Story } from "@storybook/react";
import { disabledControl } from "../../../../../../storybook-helpers/storybook-controls";

export default {
  title: "forms/Checkbox",
  component: Checkbox,
  argTypes: {
    inputRef: disabledControl,
    disabled: {
      control: "boolean",
    },
  },
};

export const Demo: Story<CheckboxProps> = (props) => <Checkbox {...props} />;

export const Overview = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setIsEnabled((v) => !v);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <Column>
      <Heading>Checkbox</Heading>

      <Space num={2} />

      <Text size={"large"} variant={"bold"}>
        Clickable and knobs
      </Text>

      <Space num={2} />

      <Checkbox
        value={checked}
        onValueChange={setChecked}
        disabled={knobs.boolean("Disabled", false)}
        indeterminate={knobs.boolean("Indeterminate", false)}
      />

      <Space num={2} />

      <Checkbox
        size={"small"}
        value={checked}
        onValueChange={setChecked}
        disabled={knobs.boolean("Disabled", false)}
        indeterminate={knobs.boolean("Indeterminate", false)}
      />

      <Space num={8} />

      <Text size={"large"} variant={"bold"}>
        Transitions
      </Text>

      <Space num={2} />

      <Row alignContent={"flex-start"}>
        <Column justifyContent={"flex-start"}>
          <Text>Checked on/off</Text>
          <Checkbox value={isEnabled} />

          <Space num={2} />

          <Text>Disabled, checked on/off</Text>
          <Checkbox value={isEnabled} disabled />
        </Column>

        <Space num={8} />

        <Column justifyContent={"flex-start"}>
          <Text>Checked, disabled on/off</Text>
          <Checkbox value disabled={isEnabled} />

          <Space num={2} />

          <Text>Not checked, disabled on/off</Text>
          <Checkbox disabled={isEnabled} />

          <Space num={2} />

          <Text>Checked, indeterminate on/off</Text>
          <Checkbox value indeterminate={isEnabled} />

          <Space num={2} />

          <Text>Not checked, indeterminate on/off</Text>
          <Checkbox indeterminate={isEnabled} />
        </Column>

        <Space num={8} />

        <Column justifyContent={"flex-start"}>
          <Text>Checked, disabled, indeterminate on/off</Text>
          <Checkbox value indeterminate={isEnabled} disabled />

          <Space num={2} />

          <Text>Not checked, disabled, indeterminate on/off</Text>
          <Checkbox indeterminate={isEnabled} disabled />
        </Column>
      </Row>
    </Column>
  );
};
export const Standard = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      value={checked}
      onValueChange={setChecked}
      disabled={knobs.boolean("Disabled", false)}
    />
  );
};

export const Small = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      size={"small"}
      value={checked}
      onValueChange={setChecked}
      disabled={knobs.boolean("Disabled", false)}
    />
  );
};

export const Indeterminate = () => (
  <Column>
    <Checkbox indeterminate />
    <Space />
    <Checkbox indeterminate disabled />
  </Column>
);

export const Disabled = () => (
  <Checkbox
    value={knobs.boolean("Checked", false)}
    indeterminate={knobs.boolean("Indeterminate", false)}
    disabled
  />
);
