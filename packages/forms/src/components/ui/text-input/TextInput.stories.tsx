import * as React from "react";
import { action } from "@storybook/addon-actions";
import { Box, Column, Heading, Row, Text } from "@stenajs-webui/core";
import { TextInput, TextInputProps, TextInputVariant } from "./TextInput";
import { StoryFn } from "@storybook/react";
import { disabledControl } from "../../../storybook-helpers/storybook-controls";
import {
  stenaAnimals,
  stenaInfoCircle,
  TextInputButton,
} from "@stenajs-webui/elements";

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

export const Demo: StoryFn<TextInputProps> = (props) => (
  <TextInput {...props} placeholder={"Enter some text"} />
);

export const Overview = () => (
  <Box width={"400px"} gap={2}>
    <Box>
      <Text>Standard</Text>
      <TextInput value={"Some nice text."} />
    </Box>
    {(
      [
        "success",
        "error",
        "warning",
        "loading",
        "modified",
      ] as Array<TextInputVariant>
    ).map((variant) => (
      <Box key={variant}>
        <Text>Variant={variant}</Text>
        <TextInput value={"Some text"} variant={variant} />
      </Box>
    ))}
    <Box>
      <Text>Icon left</Text>
      <TextInput value={"Some text"} iconLeft={stenaInfoCircle} />
    </Box>
    <Box>
      <Text>Icon right</Text>
      <TextInput value={"Some text"} iconRight={stenaInfoCircle} />
    </Box>
    <Box>
      <Text>Button right side</Text>
      <TextInput
        value={"Some text"}
        buttonRight={<TextInputButton onClick={action("click")} />}
      />
    </Box>
    <Box>
      <Text>Button left side</Text>
      <TextInput
        value={"Some text"}
        buttonLeft={<TextInputButton onClick={action("click")} />}
      />
    </Box>
    <Box>
      <Text>Button left side danger</Text>
      <TextInput
        value={"Some text"}
        buttonLeft={
          <TextInputButton onClick={action("click")} variant={"error"} />
        }
      />
    </Box>
    <Box>
      <Text>Button left side warning</Text>
      <TextInput
        value={"Some text"}
        buttonLeft={
          <TextInputButton onClick={action("click")} variant={"warning"} />
        }
      />
    </Box>
    <Box>
      <Text>Button left side success</Text>
      <TextInput
        value={"Some text"}
        buttonLeft={
          <TextInputButton onClick={action("click")} variant={"success"} />
        }
      />
    </Box>
    <Box>
      <Text>Button left side small</Text>
      <TextInput
        value={"Some text"}
        buttonLeft={
          <TextInputButton
            size={"small"}
            onClick={action("click")}
            variant={"success"}
          />
        }
      />
    </Box>
    <Box>
      <Text>Content left</Text>
      <TextInput value={"Some text"} contentLeft={<Text>ms</Text>} />
    </Box>

    <Box>
      <Text>Content right</Text>
      <TextInput value={"Some text"} contentRight={<Text>ms</Text>} />
    </Box>
    <Box>
      <Text>Placeholder</Text>
      <TextInput placeholder={"E-mail"} />
    </Box>
    <Box>
      <Text>Disabled</Text>
      <TextInput value={"Some nice text."} disabled />
    </Box>
  </Box>
);

export const Standard = () => (
  <Box width={"400px"}>
    <TextInput value={"Some nice text."} />
  </Box>
);

export const WithIconLeft = () => (
  <TextInput value={"some entered text"} iconLeft={stenaAnimals} />
);

export const WithIconRight = () => (
  <TextInput value={"some entered text"} iconRight={stenaAnimals} />
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
          width: "36px",
          height: "100%",
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
          width: "36px",
          height: "100%",
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
          width: "36px",
          height: "100%",
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
      iconLeft={stenaAnimals}
    />
  </Box>
);

export const TypeDate = () => (
  <Box width={"400px"}>
    <TextInput type={"date"} />
  </Box>
);

export const DualInput = () => (
  <Column gap={4}>
    <Column>
      <Heading>Input row</Heading>
      <Row width={"300px"}>
        <TextInput borderRadiusVariant={"onlyLeft"} />
        <TextInput borderRadiusVariant={"onlyRight"} />
      </Row>
    </Column>
    <Column>
      <Heading>Input column</Heading>
      <Column width={"300px"}>
        <TextInput borderRadiusVariant={"onlyTop"} />
        <TextInput borderRadiusVariant={"onlyBottom"} />
      </Column>
    </Column>
  </Column>
);
