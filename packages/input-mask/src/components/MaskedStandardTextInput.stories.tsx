import { Store, withState } from "@dump247/storybook-state";
import { Column, Space, StandardText } from "@stenajs-webui/core";
import { InputMasks, MaskedStandardTextInput } from "@stenajs-webui/input-mask";
import { storiesOf } from "@storybook/react";
import * as React from "react";

interface State {
  creditcard: string;
  time: string;
  date: string;
}

storiesOf("input-mask/MaskedStandardTextInput", module)
  .add(
    "standard",
    withState<State>({
      creditcard: "",
      time: "",
      date: ""
    })(({ store }: { store: Store<State> }) => {
      return (
        <Column width={"150px"}>
          <StandardText>Credit card</StandardText>
          <MaskedStandardTextInput
            mask={InputMasks.CREDIT_CARD}
            onChange={ev => store.set({ creditcard: ev.target.value })}
            value={store.state.creditcard}
            placeholder={"1234 1234 1234 1234"}
          />
          <Space num={2} />
          <StandardText>Time</StandardText>
          <MaskedStandardTextInput
            mask={InputMasks.TIME}
            onChange={ev => store.set({ time: ev.target.value })}
            value={store.state.time}
            placeholder={"12:59"}
          />
          <Space num={2} />
          <StandardText>Date</StandardText>
          <MaskedStandardTextInput
            mask={InputMasks.ISO_DATE}
            onChange={ev => store.set({ date: ev.target.value })}
            value={store.state.date}
            placeholder={"2019-12-24"}
          />
        </Column>
      );
    })
  )
  .add(
    "with prefilled value",
    withState<State>({
      creditcard: "123456789",
      time: "",
      date: ""
    })(({ store }: { store: Store<State> }) => {
      return (
        <div style={{ display: "inline-block" }}>
          <MaskedStandardTextInput
            mask={InputMasks.CREDIT_CARD}
            onChange={ev => store.set({ creditcard: ev.target.value })}
            value={store.state.creditcard}
          />
        </div>
      );
    })
  );
