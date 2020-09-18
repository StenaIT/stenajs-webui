import { Column, LargeText, Space } from "@stenajs-webui/core";
import { ButtonSize, FlatButton } from "@stenajs-webui/elements";
import * as React from "react";

const buttonSizes: Array<ButtonSize> = ["small", "normal", "large"];

export default {
  title: "elements/Buttons/FlatButton"
};

export const Standard = () => (
  <Column spacing indent>
    <LargeText>FlatButton</LargeText>
    <Space num={4} />
    <div style={{ display: "inline-block" }}>
      {buttonSizes.map(size => (
        <>
          <FlatButton key={size} size={size} label={size} />
          <Space />
        </>
      ))}
    </div>
  </Column>
);

Standard.storyName = "standard";

export const Inverted = () => (
  <Column background={"#0f304d"} spacing indent>
    <LargeText color={"#fff"}>FlatButton inverted</LargeText>
    <Space num={4} />
    <div style={{ display: "inline-block" }}>
      {buttonSizes.map(size => (
        <>
          <FlatButton key={size} size={size} label={size} inverted />
          <Space />
        </>
      ))}
    </div>
  </Column>
);

Inverted.storyName = "inverted";
