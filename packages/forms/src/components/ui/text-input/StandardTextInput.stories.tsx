import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faPaw } from "@fortawesome/free-solid-svg-icons/faPaw";
import { Box, Space, StandardText } from "@stenajs-webui/core";
import {
  defaultStandardTextInputThemeDark,
  StandardTextInput,
  TextInput
} from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("forms/TextInput/StandardTextInput", module)
  .add("TextInput", () => (
    <Box width={"400px"}>
      <StandardText>Standard</StandardText>
      <TextInput value={knobs.text("Text", "Some nice text.")} />
      <Space />
      <StandardText>Variant=success</StandardText>
      <TextInput value={"Some text"} variant={"success"} />
      <Space />
      <StandardText>Variant=error</StandardText>
      <TextInput value={"Some text"} variant={"error"} />
      <Space />
      <StandardText>Variant=warning</StandardText>
      <TextInput value={"Some text"} variant={"warning"} />
      <Space />
      <StandardText>Variant=loading</StandardText>
      <TextInput value={"Some text"} variant={"loading"} />
      <Space />
      <StandardText>Variant=modified</StandardText>
      <TextInput value={"Some text"} variant={"modified"} />
      <Space />
      <StandardText>Icon left</StandardText>
      <TextInput value={"Some text"} iconLeft={faCoffee} />
      <Space />
      <StandardText>Icon left color</StandardText>
      <TextInput
        value={"Some text"}
        iconLeft={faCoffee}
        iconColorLeft={"red"}
      />
      <Space />
      <StandardText>Icon right</StandardText>
      <TextInput value={"Some text"} iconRight={faCoffee} />
      <Space />
      <StandardText>Content left</StandardText>
      <TextInput
        value={"Some text"}
        contentLeft={<StandardText>ms</StandardText>}
      />
      <Space />
      <StandardText>Content right</StandardText>
      <TextInput
        value={"Some text"}
        contentRight={<StandardText>ms</StandardText>}
      />
      <Space />
      <StandardText>Placeholder</StandardText>
      <TextInput placeholder={"E-mail"} />
      <Space />
      <StandardText>Disabled</StandardText>
      <TextInput value={knobs.text("Text2", "Some nice text.")} disabled />
      <Space />
      <StandardText>Select all on focus</StandardText>
      <TextInput
        value={knobs.text("Text2", "Some nice text.")}
        selectAllOnFocus
      />
      <Space />
      <StandardText>Autofocus and select all on mount</StandardText>
      <TextInput
        autoFocus
        value={knobs.text("Text2", "Some nice text.")}
        selectAllOnMount
      />
    </Box>
  ))
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
