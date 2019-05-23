import { Store, withState } from "@dump247/storybook-state";
import { defaultSwitchTheme, Switch } from "@stenajs-webui/forms";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";

interface State {
  value: boolean;
}

storiesOf("forms/Switch", module)
  .addDecorator(withInfo())
  .add(
    "standard",
    withState<State>({
      value: true
    })(({ store }: { store: Store<State> }) => (
      <Switch
        value={store.state.value}
        onChange={value => store.set({ value })}
      />
    ))
  )
  .add(
    "custom size",
    withState<State>({
      value: true
    })(({ store }: { store: Store<State> }) => (
      <Switch
        value={store.state.value}
        onChange={value => store.set({ value })}
        theme={{
          ...defaultSwitchTheme,
          height: 40,
          width: 200
        }}
      />
    ))
  )
  .add(
    "custom style",
    withState<State>({
      value: true
    })(({ store }: { store: Store<State> }) => (
      <Switch
        value={store.state.value}
        onChange={value => store.set({ value })}
        theme={{
          ...defaultSwitchTheme,
          borderRadius: 10,
          checkedColors: {
            backgroundColor: "lightgreen",
            iconBackgroundColor: "pink",
            iconColor: "darkblue"
          },
          colors: {
            backgroundColor: "pink",
            iconBackgroundColor: "darkblue",
            iconColor: "lightgreen"
          },
          height: 20,
          width: 100
        }}
      />
    ))
  )
  .add(
    "disabled",
    withState<State>({
      value: true
    })(({ store }: { store: Store<State> }) => (
      <Switch
        value={store.state.value}
        disabled={true}
        onChange={value => store.set({ value })}
      />
    ))
  );
