import * as React from "react";
import { useState } from "react";
import { MaskedTextInput } from "./MaskedTextInput";
import { InputMasks } from "../masks/InputMasks";
import { Column, Space, Text } from "@stenajs-webui/core";

export default {
  title: "input-mask/MaskedTextInput",
  component: MaskedTextInput,
};

export const Overview = () => {
  const [creditCard, setCreditCard] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  return (
    <Column width={"150px"}>
      <Text>Credit card</Text>
      <MaskedTextInput
        mask={InputMasks.CREDIT_CARD}
        onValueChange={setCreditCard}
        value={creditCard}
        placeholder={"1234 1234 1234 1234"}
      />
      <Space num={2} />
      <Text>Time</Text>
      <MaskedTextInput
        mask={InputMasks.TIME}
        onValueChange={setTime}
        value={time}
        placeholder={"12:59"}
      />
      <Space num={2} />
      <Text>Date</Text>
      <MaskedTextInput
        mask={InputMasks.ISO_DATE}
        onValueChange={setDate}
        value={date}
        placeholder={"2019-12-24"}
      />
    </Column>
  );
};

export const WithPrefilledValue = () => {
  const [creditCard, setCreditCard] = useState("123456789");
  return (
    <div style={{ display: "inline-block" }}>
      <MaskedTextInput
        mask={InputMasks.CREDIT_CARD}
        onValueChange={setCreditCard}
        value={creditCard}
      />
    </div>
  );
};

export const WithOnValueChangeProp = () => {
  const [creditCard, setCreditCard] = useState("123456789");
  return (
    <div style={{ display: "inline-block" }}>
      <MaskedTextInput
        mask={InputMasks.CREDIT_CARD}
        onValueChange={setCreditCard}
        value={creditCard}
      />
    </div>
  );
};
