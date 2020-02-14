import { Store, withState } from "@dump247/storybook-state";
import {
  Column,
  HeaderText,
  LargeText,
  Row,
  Space,
  StandardText
} from "@stenajs-webui/core";
import { Checkbox, CheckboxWithLabel } from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useEffect, useState } from "react";

interface State {
  checked: boolean;
}

const CheckboxOverview: React.FC<{ store: Store<State> }> = ({ store }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setIsEnabled(v => !v);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <Column>
      <HeaderText>Checkbox</HeaderText>

      <Space num={2} />

      <LargeText fontWeight={"bold"}>Clickable and knobs</LargeText>

      <Space num={2} />

      <Checkbox
        value={store.state.checked}
        onValueChange={checked => store.set({ checked })}
        disabled={knobs.boolean("Disabled", false)}
        indeterminate={knobs.boolean("Indeterminate", false)}
      />

      <Space num={2} />

      <Checkbox
        size={"small"}
        value={store.state.checked}
        onValueChange={checked => store.set({ checked })}
        disabled={knobs.boolean("Disabled", false)}
        indeterminate={knobs.boolean("Indeterminate", false)}
      />

      <Space num={8} />

      <LargeText fontWeight={"bold"}>Transitions</LargeText>

      <Space num={2} />

      <Row alignContent={"flex-start"}>
        <Column justifyContent={"flex-start"}>
          <StandardText>Checked on/off</StandardText>
          <Checkbox value={isEnabled} />

          <Space num={2} />

          <StandardText>Disabled, checked on/off</StandardText>
          <Checkbox value={isEnabled} disabled />
        </Column>

        <Space num={8} />

        <Column justifyContent={"flex-start"}>
          <StandardText>Checked, disabled on/off</StandardText>
          <Checkbox value disabled={isEnabled} />

          <Space num={2} />

          <StandardText>Not checked, disabled on/off</StandardText>
          <Checkbox disabled={isEnabled} />

          <Space num={2} />

          <StandardText>Checked, indeterminate on/off</StandardText>
          <Checkbox value indeterminate={isEnabled} />

          <Space num={2} />

          <StandardText>Not checked, indeterminate on/off</StandardText>
          <Checkbox indeterminate={isEnabled} />
        </Column>

        <Space num={8} />

        <Column justifyContent={"flex-start"}>
          <StandardText>Checked, disabled, indeterminate on/off</StandardText>
          <Checkbox value indeterminate={isEnabled} disabled />

          <Space num={2} />

          <StandardText>
            Not checked, disabled, indeterminate on/off
          </StandardText>
          <Checkbox indeterminate={isEnabled} disabled />
        </Column>
      </Row>
    </Column>
  );
};

storiesOf("forms/Checkbox", module)
  .add(
    "Overview",
    withState<State>({
      checked: true
    })(({ store }: { store: Store<State> }) => (
      <CheckboxOverview store={store} />
    ))
  )
  .add(
    "standard",
    withState<State>({
      checked: true
    })(({ store }: { store: Store<State> }) => (
      <Checkbox
        value={store.state.checked}
        onValueChange={checked => store.set({ checked })}
        disabled={knobs.boolean("Disabled", false)}
      />
    ))
  )
  .add(
    "small",
    withState<State>({
      checked: true
    })(({ store }: { store: Store<State> }) => (
      <Checkbox
        size={"small"}
        value={store.state.checked}
        onValueChange={checked => store.set({ checked })}
        disabled={knobs.boolean("Disabled", false)}
      />
    ))
  )
  .add("indeterminate", () => (
    <Column>
      <Checkbox indeterminate />
      <Space />
      <Checkbox indeterminate disabled />
    </Column>
  ));

storiesOf("forms/Checkbox/CheckboxWithLabel", module)
  .add(
    "standard",
    withState<State>({
      checked: true
    })(({ store }: { store: Store<State> }) => (
      <CheckboxWithLabel
        label={"Add cake"}
        value={store.state.checked}
        onValueChange={checked => store.set({ checked })}
        disabled={knobs.boolean("Disabled", false)}
      />
    ))
  )
  .add("disabled", () => (
    <Checkbox
      label={"Add cake"}
      value={knobs.boolean("Checked", false)}
      indeterminate={knobs.boolean("Indeterminate", false)}
      disabled
    />
  ));
