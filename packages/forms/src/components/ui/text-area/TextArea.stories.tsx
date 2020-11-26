import { Box } from "@stenajs-webui/core";
import * as React from "react";
import { useState } from "react";
import { TextArea, TextAreaProps } from "./TextArea";
import { Story } from "@storybook/react";
import { disabledControl } from "../../../../../../storybook-helpers/storybook-controls";

export default {
  title: "forms/TextInput/TextArea",
  component: TextArea,
  argTypes: {
    inputRef: disabledControl,
  },
};

export const Demo: Story<TextAreaProps> = (props) => <TextArea {...props} />;

export const Standard = () => {
  const [text, setText] = useState("");
  return <TextArea value={text} onValueChange={setText} />;
};

export const WithCustomWidth = () => {
  const [text, setText] = useState("");
  return (
    <Box width={"400px"}>
      <TextArea rows={3} value={text} onValueChange={setText} />
    </Box>
  );
};

export const WithResize = () => {
  const [text, setText] = useState("");
  return <TextArea resize={"both"} value={text} onValueChange={setText} />;
};

export const Readonly = () => {
  const [text, setText] = useState("");
  return <TextArea readOnly value={text} onValueChange={setText} />;
};

export const Disabled = () => {
  const [text, setText] = useState("");
  return <TextArea disabled value={text} onValueChange={setText} />;
};
