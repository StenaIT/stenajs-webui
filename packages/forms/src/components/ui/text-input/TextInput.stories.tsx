import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faPaw } from "@fortawesome/free-solid-svg-icons/faPaw";
import { Box, Space, StandardText } from "@stenajs-webui/core";
import { TextInput, TextInputVariant } from "@stenajs-webui/forms";
import * as knobs from "@storybook/addon-knobs";
import * as React from "react";

export default {
  title: "forms/TextInput/TextInput",
};

export const Overview = () => (
  <Box width={"400px"}>
    <StandardText>Standard</StandardText>
    <TextInput value={knobs.text("Text", "Some nice text.")} />
    <Space />
    {(["success", "error", "warning", "loading", "modified"] as Array<
      TextInputVariant
    >).map((variant) => (
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
);

export const Standard = () => (
  <Box width={"400px"}>
    <TextInput value={knobs.text("Text", "Some nice text.")} />
  </Box>
);

export const WithIconLeft = () => (
  <TextInput value={"some entered text"} iconLeft={faCoffee} />
);

export const WithIconRight = () => (
  <TextInput value={"some entered text"} iconRight={faPaw} />
);

export const WithContentLeft = () => (
  <TextInput
    value={"some entered text"}
    contentLeft={<StandardText>W</StandardText>}
  />
);

export const WithContentRight = () => (
  <TextInput
    value={"some entered text"}
    contentRight={<StandardText>ms</StandardText>}
  />
);

export const WithContentAndNoContentPadding = () => (
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
          borderRadius: "4px",
        }}
      />
    }
    disableContentPadding
  />
);

export const WithContentAndNoContentPaddingRight = () => (
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
          borderRadius: "4px",
        }}
      />
    }
    disableContentPaddingRight
  />
);

export const WithContentAndNoContentPaddingLeft = () => (
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
          borderRadius: "4px",
        }}
      />
    }
    disableContentPaddingLeft
  />
);

export const Empty = () => <TextInput value={""} />;

export const WithPlaceholder = () => (
  <TextInput value={""} placeholder={"Enter name"} />
);

export const WithCustomStyling = () => (
  <Box width={"400px"}>
    <TextInput
      value={"some input text"}
      style={{ fontStyle: "italic", fontWeight: "bold", color: "orange" }}
    />
  </Box>
);

export const WithSelectAllOnMount = () => (
  <Box width={"400px"}>
    <StandardText>
      The field is automatically focused and all text is selected.
    </StandardText>
    <Space />
    <TextInput value={"Donald Duck"} selectAllOnMount autoFocus />
  </Box>
);

export const WithSelectAllOnFocus = () => (
  <Box width={"400px"}>
    <StandardText>All text is selected when field is focused.</StandardText>
    <Space />
    <TextInput value={"Donald Duck"} selectAllOnFocus />
  </Box>
);

export const Disabled = () => (
  <Box width={"400px"}>
    <TextInput value={""} placeholder={"Enter name"} disabled={true} />
  </Box>
);

export const DisabledWithContent = () => (
  <Box width={"400px"}>
    <TextInput
      disabled={true}
      value={"some entered text"}
      contentRight={<StandardText>ms</StandardText>}
      iconLeft={faCoffee}
    />
  </Box>
);

export const TypeDate = () => (
  <Box width={"400px"}>
    <TextInput type={"date"} />
  </Box>
);
