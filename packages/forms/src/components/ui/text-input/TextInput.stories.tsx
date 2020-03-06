import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faPaw } from "@fortawesome/free-solid-svg-icons/faPaw";
import { Box, Space, StandardText } from "@stenajs-webui/core";
import { TextInput, TextInputVariant } from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

storiesOf("forms/TextInput/TextInput", module)
  .add("TextInput", () => (
    <Box width={"400px"}>
      <StandardText>Standard</StandardText>
      <TextInput value={knobs.text("Text", "Some nice text.")} />
      <Space />
      {(["success", "error", "warning", "loading", "modified"] as Array<
        TextInputVariant
      >).map(variant => (
        <React.Fragment key={variant}>
          <StandardText>Variant={variant}</StandardText>
          <TextInput value={"Some text"} variant={variant} />
          <Space />
        </React.Fragment>
      ))}
      <StandardText>Icon left</StandardText>
      <TextInput value={"Some text"} iconLeft={faCoffee} />
      <Space />
      <StandardText>Icon right</StandardText>
      <TextInput value={"Some text"} iconRight={faCoffee} />
      <Space />
      <StandardText>Icon clickable</StandardText>
      <TextInput
        value={"Some text"}
        iconLeft={faCoffee}
        onClickLeft={() => alert("click")}
      />
      <Space />
      <StandardText>Content left</StandardText>
      <TextInput
        value={"Some text"}
        contentLeft={
          <StandardText lineHeight={"var(--swui-field-text-line-height)"}>
            ms
          </StandardText>
        }
      />
      <Space />
      <StandardText>Content right</StandardText>
      <TextInput
        value={"Some text"}
        contentRight={
          <StandardText lineHeight={"var(--swui-field-text-line-height)"}>
            ms
          </StandardText>
        }
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
      <TextInput value={knobs.text("Text", "Some nice text.")} />
    </Box>
  ))
  .add("with icon left", () => (
    <TextInput value={"some entered text"} iconLeft={faCoffee} />
  ))
  .add("with icon right", () => (
    <TextInput value={"some entered text"} iconRight={faPaw} />
  ))
  .add("with content left", () => (
    <TextInput
      value={"some entered text"}
      contentLeft={<StandardText>W</StandardText>}
    />
  ))
  .add("with content right", () => (
    <TextInput
      value={"some entered text"}
      contentRight={<StandardText>ms</StandardText>}
    />
  ))
  .add("with content and no content padding", () => (
    <TextInput
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
    <TextInput
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
    <TextInput
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
  .add("empty", () => <TextInput value={""} />)
  .add("with placeholder", () => (
    <TextInput value={""} placeholder={"Enter name"} />
  ))
  .add("with custom styling", () => (
    <Box width={"400px"}>
      <TextInput
        value={"some input text"}
        style={{ fontStyle: "italic", fontWeight: "bold", color: "orange" }}
      />
    </Box>
  ))
  .add("with select all on mount", () => (
    <Box width={"400px"}>
      <StandardText>
        The field is automatically focused and all text is selected.
      </StandardText>
      <Space />
      <TextInput value={"Donald Duck"} selectAllOnMount autoFocus />
    </Box>
  ))
  .add("with select all on focus", () => (
    <Box width={"400px"}>
      <StandardText>All text is selected when field is focused.</StandardText>
      <Space />
      <TextInput value={"Donald Duck"} selectAllOnFocus />
    </Box>
  ))
  .add("disabled", () => (
    <Box width={"400px"}>
      <TextInput value={""} placeholder={"Enter name"} disabled={true} />
    </Box>
  ))
  .add("disabled with content", () => (
    <Box width={"400px"}>
      <TextInput
        disabled={true}
        value={"some entered text"}
        contentRight={<StandardText>ms</StandardText>}
        iconLeft={faCoffee}
      />
    </Box>
  ));
