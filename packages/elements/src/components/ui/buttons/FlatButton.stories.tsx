import { Column, LargeText, Space } from "@stenajs-webui/core";
import { ButtonSize, FlatButton } from "@stenajs-webui/elements";
import { storiesOf } from "@storybook/react";
import * as React from "react";

const buttonSizes: Array<ButtonSize> = ["small", "normal", "large"];

storiesOf("elements/Buttons/FlatButton", module)
  .add("standard", () => (
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
  ))
  .add("inverted", () => (
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
  ));
