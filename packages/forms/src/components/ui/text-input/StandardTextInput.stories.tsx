import { Box, Space, StandardText } from "@stenajs-webui/core";
import {
  defaultStandardTextInputThemeDark,
  StandardTextInput
} from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { faCoffee } from "@fortawesome/pro-light-svg-icons/faCoffee";
import { faPaw } from "@fortawesome/pro-light-svg-icons/faPaw";

storiesOf("forms/TextInput/StandardTextInput", module)
  .add("standard", () => (
    <Box width={"400px"}>
      <StandardTextInput value={knobs.text("Text", "Some nice text.")} />
    </Box>
  ))
  .add("with background and text color", () => (
    <Box width={"400px"}>
      <StandardTextInput
        value={knobs.text("Text", "Some nice text.")}
        backgroundColor={knobs.color("Background color", "#5f4860")}
        textColor={knobs.color("Text color", "#fffb9f")}
      />
    </Box>
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
    <Box width={"400px"}>
      <StandardTextInput
        value={"some input text"}
        style={{ fontStyle: "italic", fontWeight: "bold", color: "orange" }}
      />
    </Box>
  ))
  .add("with select all on mount", () => (
    <Box width={"400px"}>
      <StandardTextInput value={"Donald Duck"} selectAllOnMount />
    </Box>
  ))
  .add("with select all on focus", () => (
    <Box width={"400px"}>
      <StandardTextInput value={"Donald Duck"} selectAllOnFocus />
    </Box>
  ))
  .add("disabled", () => (
    <Box width={"400px"}>
      <StandardTextInput
        value={""}
        placeholder={"Enter name"}
        disabled={true}
      />
    </Box>
  ))
  .add("disabled with content", () => (
    <Box width={"400px"}>
      <StandardTextInput
        disabled={true}
        value={"some entered text"}
        contentRight={<StandardText>ms</StandardText>}
        iconLeft={faCoffee}
      />
    </Box>
  ))
  .add("invalid", () => (
    <Box width={"400px"}>
      <StandardTextInput
        value={"invalid input"}
        placeholder={"Enter name"}
        invalid={true}
      />
    </Box>
  ))
  .add("invalid with content", () => (
    <Box width={"400px"}>
      <StandardTextInput
        invalid={true}
        value={"invalid input"}
        contentRight={<StandardText>ms</StandardText>}
        iconLeft={faCoffee}
      />
    </Box>
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
