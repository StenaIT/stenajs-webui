import { Story } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import {
  GroupedChipMultiSelect,
  GroupedChipMultiSelectValue,
} from "./GroupedChipMultiSelect";

export default {
  title: "select/GroupedChipMultiSelect",
  component: GroupedChipMultiSelect,
  decorators: [
    (TheStory: Story) => (
      <div style={{ width: "300px", marginBottom: "250px" }}>
        <TheStory />
      </div>
    ),
  ],
};

const optionMocks = [
  {
    label: "CA",
    options: [
      {
        value: "Mattias",
        label: "Mattias",
        data: "Mattias",
      },
    ],
  },
  {
    label: "Freight",
    options: [
      {
        value: "Johan",
        label: "Johan",
        data: "Johan",
      },
      {
        value: "Dennis the menace",
        label: "Dennis the menace",
        data: "Dennis the menace",
      },
    ],
  },
];

export const Demo = () => {
  const [text, setText] = useState<string>("");
  const [value, setValue] = useState<
    ReadonlyArray<GroupedChipMultiSelectValue<string>>
  >([]);

  return (
    <GroupedChipMultiSelect
      options={optionMocks}
      value={value}
      onValueChange={setValue}
      inputValue={text}
      onInputChange={setText}
    />
  );
};

const complexOptionMocks = [
  {
    label: "CA",
    options: [
      {
        value: "Mattias",
        label: "Mattias",
        data: { name: "Mattias" },
      },
    ],
  },
  {
    label: "Freight",
    options: [
      {
        value: "Johan",
        label: "Johan",
        data: { name: "Johan" },
      },
      {
        value: "Dennis the menace",
        label: "Dennis the menace",
        data: { name: "Dennis the menace" },
      },
    ],
  },
];

export const WithComplexData = () => {
  const [text, setText] = useState<string>("");
  const [value, setValue] = useState<
    ReadonlyArray<GroupedChipMultiSelectValue<{ name: string }>>
  >([]);

  return (
    <GroupedChipMultiSelect
      options={complexOptionMocks}
      value={value}
      onValueChange={setValue}
      inputValue={text}
      onInputChange={setText}
    />
  );
};
