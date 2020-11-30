import { Column, Text, Space } from "@stenajs-webui/core";
import * as React from "react";
import { ButtonSize } from "./common/ButtonCommon";
import { FlatButton } from "./FlatButton";

const buttonSizes: Array<ButtonSize> = ["small", "medium", "large"];

export default {
  title: "elements/Buttons/FlatButton",
};

export const Standard = () => (
  <Column spacing indent>
    <Text size={"large"}>FlatButton</Text>
    <Space num={4} />
    <div style={{ display: "inline-block" }}>
      {buttonSizes.map((size) => (
        <>
          <FlatButton key={size} size={size} label={size} />
          <Space />
        </>
      ))}
    </div>
  </Column>
);

export const Inverted = () => (
  <Column background={"#0f304d"} spacing indent>
    <Text size={"large"} color={"#fff"}>
      FlatButton inverted
    </Text>
    <Space num={4} />
    <div style={{ display: "inline-block" }}>
      {buttonSizes.map((size) => (
        <>
          <FlatButton key={size} size={size} label={size} inverted />
          <Space />
        </>
      ))}
    </div>
  </Column>
);
