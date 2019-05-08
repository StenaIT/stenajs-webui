import { Border, StandardText } from "@stenajs-webui/core";
import { withInfo } from "@storybook/addon-info";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Inline } from "../../layout/inline/Inline";

storiesOf("core/Decorators/Border", module)
  .addDecorator(withInfo({ propTablesExclude: [StandardText] }))
  .add("default", () => (
    <Inline>
      <Border>
        <StandardText>This text has a border</StandardText>
      </Border>
    </Inline>
  ))
  .add("with color", () => (
    <Inline>
      <Border borderColor={"#f284ff"}>
        <StandardText>This text has a border</StandardText>
      </Border>
    </Inline>
  ))
  .add("with borderRadius", () => (
    <Inline>
      <Border borderRadius={"5px"}>
        <StandardText>This text has a border</StandardText>
      </Border>
    </Inline>
  ))
  .add("with custom border style", () => (
    <Inline>
      <Border borderRadius={"5px"} borderStyle={"dotted"}>
        <StandardText>This text has a dotted border</StandardText>
      </Border>
    </Inline>
  ));
