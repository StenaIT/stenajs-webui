import * as React from "react";
import { useState } from "react";
import { RadioButtonWithLabel } from "@stenajs-webui/forms";
import { Column, Space } from "@stenajs-webui/core";

export default {
  title: "forms/RadioButton/RadioButtonWithLabel",
  component: RadioButtonWithLabel,
};

export const Standard = () => {
  const [selected, setSelected] = useState("");

  return (
    <Column>
      <RadioButtonWithLabel
        label={"Cake"}
        value={"cake"}
        checked={selected === "cake"}
        onValueChange={setSelected}
      />
      <Space />
      <RadioButtonWithLabel
        label={"Ice cream"}
        value={"icecream"}
        checked={selected === "icecream"}
        onValueChange={setSelected}
      />
      <Space />
      <RadioButtonWithLabel
        label={"Waffles"}
        value={"waffles"}
        checked={selected === "waffles"}
        onValueChange={setSelected}
      />
    </Column>
  );
};
