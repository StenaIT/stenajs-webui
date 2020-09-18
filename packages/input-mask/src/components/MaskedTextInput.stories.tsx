import { Store, withState } from "@dump247/storybook-state";
import { Column, Space, StandardText } from "@stenajs-webui/core";
import { InputMasks, MaskedTextInput } from "@stenajs-webui/input-mask";
import * as React from "react";

interface State {
  creditcard: string;
  time: string;
  date: string;
}

export default {
  title: "input-mask/MaskedTextInput"
};

export const Standard = withState<State>({
  creditcard: "",
  time: "",
  date: ""
})(({ store }: { store: Store<State> }) => {
  return (
    <Column width={"150px"}>
      <StandardText>Credit card</StandardText>
      <MaskedTextInput
        mask={InputMasks.CREDIT_CARD}
        onChange={ev => store.set({ creditcard: ev.target.value })}
        value={store.state.creditcard}
        placeholder={"1234 1234 1234 1234"}
      />
      <Space num={2} />
      <StandardText>Time</StandardText>
      <MaskedTextInput
        mask={InputMasks.TIME}
        onChange={ev => store.set({ time: ev.target.value })}
        value={store.state.time}
        placeholder={"12:59"}
      />
      <Space num={2} />
      <StandardText>Date</StandardText>
      <MaskedTextInput
        mask={InputMasks.ISO_DATE}
        onChange={ev => store.set({ date: ev.target.value })}
        value={store.state.date}
        placeholder={"2019-12-24"}
      />
    </Column>
  );
});

Standard.story = {
  name: "standard"
};

export const WithPrefilledValue = withState<State>({
  creditcard: "123456789",
  time: "",
  date: ""
})(({ store }: { store: Store<State> }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <MaskedTextInput
        mask={InputMasks.CREDIT_CARD}
        onChange={ev => store.set({ creditcard: ev.target.value })}
        value={store.state.creditcard}
      />
    </div>
  );
});

WithPrefilledValue.story = {
  name: "with prefilled value"
};

export const WithOnValueChangeProp = withState<State>({
  creditcard: "123456789",
  time: "",
  date: ""
})(({ store }: { store: Store<State> }) => {
  return (
    <div style={{ display: "inline-block" }}>
      <MaskedTextInput
        mask={InputMasks.CREDIT_CARD}
        onValueChange={creditcard => store.set({ creditcard })}
        value={store.state.creditcard}
      />
    </div>
  );
});

WithOnValueChangeProp.story = {
  name: "with onValueChange prop"
};
