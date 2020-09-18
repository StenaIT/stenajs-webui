import { Store, withState } from "@dump247/storybook-state";
import {
  Column,
  HeaderText,
  LargeText,
  Row,
  Space,
  StandardText
} from "@stenajs-webui/core";
import { RadioButton, RadioButtonWithLabel } from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import * as React from "react";
import { useEffect, useState } from "react";

interface State {
  selected: string;
  selectedSmall: string;
  checked: boolean;
}

const RadioButtonOverview: React.FC<{ store: Store<State> }> = ({ store }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setIsEnabled(v => !v);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const onClickHandler = (selected: string) => store.set({ selected });
  const onClickSmallHandler = (selectedSmall: string) =>
    store.set({ selectedSmall });

  return (
    <Column>
      <HeaderText>RadioButton</HeaderText>

      <Space num={2} />

      <LargeText fontWeight={"bold"}>Clickable and knobs</LargeText>

      <Space num={2} />

      <RadioButtonWithLabel
        label={"Boat"}
        name={"travel"}
        value={"boat"}
        checked={store.state.selected === "boat"}
        onValueChange={onClickHandler}
      />

      <Space />

      <RadioButtonWithLabel
        label={"Plane"}
        name={"travel"}
        value={"plane"}
        checked={store.state.selected === "plane"}
        onValueChange={onClickHandler}
      />

      <Space />

      <RadioButtonWithLabel
        label={"Car"}
        name={"travel"}
        value={"car"}
        checked={store.state.selected === "car"}
        onValueChange={onClickHandler}
      />

      <Space />

      <RadioButtonWithLabel
        label={"Walk"}
        name={"travel"}
        value={"walk"}
        checked={store.state.selected === "walk"}
        onValueChange={onClickHandler}
        disabled
      />

      <Space num={3} />

      <RadioButtonWithLabel
        size={"small"}
        label={"Today"}
        name={"day"}
        value={"today"}
        checked={store.state.selectedSmall === "today"}
        onValueChange={onClickSmallHandler}
      />

      <Space />

      <RadioButtonWithLabel
        size={"small"}
        label={"Tomorrow"}
        name={"day"}
        value={"tomorrow"}
        checked={store.state.selectedSmall === "tomorrow"}
        onValueChange={onClickSmallHandler}
      />

      <Space />

      <RadioButtonWithLabel
        size={"small"}
        label={"Yesterday"}
        name={"day"}
        value={"yesterday"}
        checked={store.state.selectedSmall === "yesterday"}
        onValueChange={onClickSmallHandler}
        disabled
      />

      <Space num={8} />

      <LargeText fontWeight={"bold"}>Transitions</LargeText>

      <Space num={2} />

      <Row alignContent={"flex-start"}>
        <Column justifyContent={"flex-start"}>
          <StandardText>Checked on/off</StandardText>
          <RadioButton checked={isEnabled} />

          <Space num={2} />

          <StandardText>Disabled, checked on/off</StandardText>
          <RadioButton checked={isEnabled} disabled />
        </Column>

        <Space num={8} />

        <Column justifyContent={"flex-start"}>
          <StandardText>Checked, disabled on/off</StandardText>
          <RadioButton checked disabled={isEnabled} />

          <Space num={2} />

          <StandardText>Not checked, disabled on/off</StandardText>
          <RadioButton disabled={isEnabled} />
        </Column>
      </Row>
    </Column>
  );
};

export default {
  title: "forms/RadioButton"
};

export const Overview = withState<State>({
  checked: true,
  selectedSmall: "",
  selected: ""
})(({ store }: { store: Store<State> }) => (
  <RadioButtonOverview store={store} />
));

export const Standard = () => (
  <RadioButton
    checked={knobs.boolean("Checked", false)}
    disabled={knobs.boolean("Disabled", false)}
  />
);

export const CustomActionColorOnMultiple = () => (
  <Column style={{ "--swui-color-primary-action": "#41ae33" } as any}>
    <RadioButton name={"testing"} disabled={knobs.boolean("Disabled", false)} />
    <Space />
    <RadioButton name={"testing"} disabled={knobs.boolean("Disabled", false)} />
    <Space />
    <RadioButton name={"testing"} disabled={knobs.boolean("Disabled", false)} />
  </Column>
);

CustomActionColorOnMultiple.storyName = "custom action color on multiple";

export const CustomCheckedBgColorOnSingle = () => (
  <Column>
    <RadioButton
      name={"testing"}
      style={{ "--swui-radiobutton-checked-bg-color": "#41ae33" } as any}
      disabled={knobs.boolean("Disabled", false)}
    />
    <Space />
    <RadioButton name={"testing"} disabled={knobs.boolean("Disabled", false)} />
  </Column>
);

CustomCheckedBgColorOnSingle.storyName = "custom checked bg color on single";
