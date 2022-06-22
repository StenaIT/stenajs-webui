import * as React from "react";
import { faCoffee } from "@fortawesome/free-solid-svg-icons/faCoffee";
import { faPaw } from "@fortawesome/free-solid-svg-icons/faPaw";
import { Box, Space, Text } from "@stenajs-webui/core";
import { TextInput, TextInputProps, TextInputVariant } from "./TextInput";
import { Story } from "@storybook/react";
import { disabledControl } from "../../../storybook-helpers/storybook-controls";
import { Badge } from "@stenajs-webui/elements";

export default {
  title: "forms/TextInput/TextInput",
  component: TextInput,
  argTypes: {
    wrapperStyle: disabledControl,
    wrapperClassName: disabledControl,
    inputRef: disabledControl,
    contentLeft: disabledControl,
    contentRight: disabledControl,
    iconLeft: disabledControl,
    iconRight: disabledControl,
  },
};

export const Demo: Story<TextInputProps> = (props) => <TextInput {...props} />;

export const Overview = () => (
  <Box width={"400px"}>
    <Text>Standard</Text>
    <TextInput value={"Some nice text."} />
    <Space />
    {(
      [
        "success",
        "error",
        "warning",
        "loading",
        "modified",
      ] as Array<TextInputVariant>
    ).map((variant) => (
      <React.Fragment key={variant}>
        <Text>Variant={variant}</Text>
        <TextInput value={"Some text"} variant={variant} />
        <Space />
      </React.Fragment>
    ))}
    <Text>Icon left</Text>
    <TextInput value={"Some text"} iconLeft={faCoffee} />
    <Space />
    <Text>Icon right</Text>
    <TextInput value={"Some text"} iconRight={faCoffee} />
    <Space />
    <Text>Icon clickable</Text>
    <TextInput
      value={"Some text"}
      iconLeft={faCoffee}
      onClickLeft={() => alert("click")}
    />
    <Space />
    <Text>Content left</Text>
    <TextInput value={"Some text"} contentLeft={<Text>ms</Text>} />
    <Space />
    <Text>Content right</Text>
    <TextInput value={"Some text"} contentRight={<Text>ms</Text>} />
    <Space />
    <Text>Placeholder</Text>
    <TextInput placeholder={"E-mail"} />
    <Space />
    <Text>Disabled</Text>
    <TextInput value={"Some nice text."} disabled />
  </Box>
);

export const Standard = () => (
  <Box width={"400px"}>
    <TextInput value={"Some nice text."} />
  </Box>
);

export const WithIconLeft = () => (
  <TextInput value={"some entered text"} iconLeft={faCoffee} />
);

export const WithIconRight = () => (
  <TextInput value={"some entered text"} iconRight={faPaw} />
);

export const WithContentLeft = () => (
  <TextInput value={"some entered text"} contentLeft={<Text>W</Text>} />
);

export const WithContentRight = () => (
  <TextInput value={"some entered text"} contentRight={<Text>ms</Text>} />
);

export const WithContentAndNoContentPadding = () => (
  <TextInput
    value={"some entered text"}
    contentLeft={<Text>W</Text>}
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
    contentLeft={<Text>W</Text>}
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
    contentRight={<Text>W</Text>}
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
      contentRight={<Text>ms</Text>}
      iconLeft={faCoffee}
    />
  </Box>
);

export const TypeDate = () => (
  <Box width={"400px"}>
    <TextInput type={"date"} />
  </Box>
);

export const WithClickableContent = () => (
  <Box width={"400px"}>
    <TextInput
      contentRight={<Badge label={"2"} />}
      onClickRight={() => alert("Clicked")}
    />
  </Box>
);
