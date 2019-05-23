import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faPaw } from "@fortawesome/free-solid-svg-icons/faPaw";
import { Box, Space, StandardText } from "@stenajs-webui/core";
import { withInfo } from "@storybook/addon-info";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { StandardTextInput } from "./StandardTextInput";
import { defaultStandardTextInputThemeDark } from "./StandardTextInputTheme";

storiesOf("forms/TextInput/StandardTextInput", module)
  .addDecorator(withInfo())
  .add("standard", () => (
    <StandardTextInput value={knobs.text("Text", "Some nice text.")} />
  ))
  .add("with dark theme", () => (
    <Box width={"400px"} background={"#2e4662"} indent={4} spacing={4}>
      <StandardTextInput
        value={"some entered text"}
        theme={defaultStandardTextInputThemeDark}
      />
    </Box>
  ))
  .add("with dark theme and icons", () => (
    <Box width={"400px"} background={"#2e4662"} indent={4} spacing={4}>
      <StandardTextInput
        value={"some entered text"}
        iconLeft={faCoffee}
        theme={defaultStandardTextInputThemeDark}
      />
    </Box>
  ))
  .add("with icon left", () => (
    <StandardTextInput value={"some entered text"} iconLeft={faCoffee} />
  ))
  .add("with icon right", () => (
    <StandardTextInput value={"some entered text"} iconRight={faPaw} />
  ))
  .add("with content left", () => (
    <StandardTextInput
      value={"some entered text"}
      contentLeft={<StandardText>W</StandardText>}
    />
  ))
  .add("with content right", () => (
    <StandardTextInput
      value={"some entered text"}
      contentRight={<StandardText>ms</StandardText>}
    />
  ))
  .add("with content and no content padding", () => (
    <StandardTextInput
      value={"some entered text"}
      contentLeft={<StandardText>W</StandardText>}
      contentRight={
        <div
          style={{
            marginRight: "2px",
            width: "32px",
            height: "32px",
            backgroundColor: "red",
            borderRadius: "4px"
          }}
        />
      }
      disableContentPadding
    />
  ))
  .add("with content and no content padding right", () => (
    <StandardTextInput
      value={"some entered text"}
      contentLeft={<StandardText>W</StandardText>}
      contentRight={
        <div
          style={{
            marginRight: "2px",
            width: "32px",
            height: "32px",
            backgroundColor: "red",
            borderRadius: "4px"
          }}
        />
      }
      disableContentPaddingRight
    />
  ))
  .add("with content and no content padding left", () => (
    <StandardTextInput
      value={"some entered text"}
      contentRight={<StandardText>W</StandardText>}
      contentLeft={
        <div
          style={{
            marginRight: "2px",
            width: "32px",
            height: "32px",
            backgroundColor: "red",
            borderRadius: "4px"
          }}
        />
      }
      disableContentPaddingLeft
    />
  ))
  .add("with icons with colors", () => (
    <StandardTextInput
      value={"some entered text"}
      iconLeft={faCoffee}
      iconRight={faPaw}
      iconColorLeft={"red"}
      iconColorRight={"green"}
    />
  ))
  .add("with icons and background color", () => (
    <StandardTextInput
      value={"some entered text"}
      iconLeft={faCoffee}
      iconRight={faPaw}
      backgroundColor={"red"}
    />
  ))
  .add("empty", () => <StandardTextInput value={""} />)
  .add("with placeholder", () => (
    <StandardTextInput value={""} placeholder={"Enter name"} />
  ))
  .add("with custom styling", () => (
    <div style={{ width: 200 }}>
      <StandardTextInput
        value={"some input text"}
        style={{ fontStyle: "italic", fontWeight: "bold", color: "orange" }}
      />
    </div>
  ))
  .add("disabled", () => (
    <StandardTextInput value={""} placeholder={"Enter name"} disabled={true} />
  ))
  .add("disabled with content", () => (
    <StandardTextInput
      disabled={true}
      value={"some entered text"}
      contentRight={<StandardText>ms</StandardText>}
      iconLeft={faCoffee}
    />
  ))
  .add("with dynamic width", () => (
    <div>
      <StandardTextInput value={"120px"} width={"120px"} />

      <Space />

      <StandardTextInput value={"24em"} width={"24em"} />

      <Space />

      <StandardTextInput value={"100%"} width={"100%"} />
    </div>
  ));
