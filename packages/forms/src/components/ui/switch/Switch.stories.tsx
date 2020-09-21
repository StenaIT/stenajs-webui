import { Store, withState } from "@dump247/storybook-state";
import {
  Column,
  HeaderText,
  LargeText,
  Row,
  Space,
  StandardText,
} from "@stenajs-webui/core";
import { Switch } from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import * as React from "react";
import { useEffect, useState } from "react";

interface State {
  selected: boolean;
  selectedSmall: boolean;
  checked: boolean;
}

const SwitchOverview: React.FC<{ store: Store<State> }> = ({ store }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setIsEnabled((v) => !v);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const onClickHandler = (selected: boolean) => store.set({ selected });

  return (
    <Column>
      <HeaderText>Switch</HeaderText>

      <Space num={2} />

      <LargeText fontWeight={"bold"}>Clickable and knobs</LargeText>

      <Space num={2} />

      <Switch value={store.state.selected} onValueChange={onClickHandler} />

      <Space num={8} />

      <LargeText fontWeight={"bold"}>Transitions</LargeText>

      <Space num={2} />

      <Row alignContent={"flex-start"}>
        <Column justifyContent={"flex-start"}>
          <StandardText>Value on/off</StandardText>
          <Switch value={isEnabled} />

          <Space num={2} />

          <StandardText>Disabled, checked on/off</StandardText>
          <Switch value={isEnabled} disabled />
        </Column>

        <Space num={8} />

        <Column justifyContent={"flex-start"}>
          <StandardText>Checked, disabled on/off</StandardText>
          <Switch value disabled={isEnabled} />

          <Space num={2} />

          <StandardText>Not checked, disabled on/off</StandardText>
          <Switch disabled={isEnabled} />
        </Column>
      </Row>
    </Column>
  );
};

export default {
  title: "forms/Switch",
};

export const Overview = withState<State>({
  checked: true,
  selectedSmall: false,
  selected: false,
})(({ store }: { store: Store<State> }) => <SwitchOverview store={store} />);

export const Standard = () => (
  <Switch
    value={knobs.boolean("Toggled", false)}
    disabled={knobs.boolean("Disabled", false)}
  />
);

Standard.storyName = "standard";

export const CustomActionColor = () => (
  <div style={{ "--swui-primary-action-color": "#41ae33" } as any}>
    <Switch
      value={knobs.boolean("Toggled", false)}
      disabled={knobs.boolean("Disabled", false)}
    />
  </div>
);

CustomActionColor.storyName = "custom action color";

export const Disabled = () => (
  <Switch value={knobs.boolean("Toggled", false)} disabled />
);

Disabled.storyName = "disabled";
