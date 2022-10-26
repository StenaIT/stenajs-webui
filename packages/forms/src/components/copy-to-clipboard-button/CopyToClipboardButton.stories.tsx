import { Story } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { TextInput, TextInputProps } from "../ui/text-input/TextInput";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

export default {
  title: "forms/CopyToClipboard/CopyToClipboardButton",
  component: CopyToClipboardButton,
};

export const Demo: Story<TextInputProps> = (props) => {
  const [text, setText] = useState("");
  return (
    <TextInput
      {...props}
      value={text}
      onValueChange={setText}
      contentRight={<CopyToClipboardButton value={text} />}
    />
  );
};
