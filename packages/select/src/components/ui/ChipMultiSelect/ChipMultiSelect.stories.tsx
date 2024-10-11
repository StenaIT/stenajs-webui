import { useBoolean } from "@stenajs-webui/core";
import { Story } from "@storybook/react";
import { useState } from "react";
import * as React from "react";
import { ChipMultiSelect, ChipMultiSelectOption } from "./ChipMultiSelect";

export default {
  title: "select/ChipMultiSelect",
  component: ChipMultiSelect,
  decorators: [
    (TheStory: Story) => (
      <div style={{ width: "300px", marginBottom: "250px" }}>
        <TheStory />
      </div>
    ),
  ],
};

const optionMocks: ChipMultiSelectOption[] = [
  { value: "1", label: "Kalle" },
  { value: "2", label: "Joakim" },
  { value: "3", label: "Kajsa" },
  { value: "4", label: "Knatte" },
  { value: "5", label: "Fnatte" },
  { value: "6", label: "Tjatte" },
  { value: "7", label: "Janne" },
];

interface ChipMultiSelectValueWithData extends ChipMultiSelectOption {
  data: { name: string };
}

const complexOptionMocks: ChipMultiSelectValueWithData[] = [
  { value: "1", label: "Kalle", data: { name: "Kalle" } },
  { value: "2", label: "Joakim", data: { name: "Joakim" } },
  { value: "3", label: "Kajsa", data: { name: "Kajsa" } },
  { value: "4", label: "Knatte", data: { name: "Knatte" } },
  { value: "5", label: "Fnatte", data: { name: "Fnatte" } },
  { value: "6", label: "Tjatte", data: { name: "Tjatte" } },
  { value: "7", label: "Janne", data: { name: "Janne" } },
];

export const Demo = () => {
  const [text, setText] = useState<string>("");
  const [value, setValue] = useState<Array<ChipMultiSelectOption>>([]);

  return (
    <ChipMultiSelect
      options={optionMocks}
      value={value}
      onValueChange={setValue}
      inputValue={text}
      onInputChange={setText}
    />
  );
};

export const WithComplexData = () => {
  const [text, setText] = useState<string>("");
  const [value, setValue] = useState<Array<ChipMultiSelectValueWithData>>([]);

  return (
    <ChipMultiSelect
      options={complexOptionMocks}
      value={value}
      onValueChange={setValue}
      inputValue={text}
      onInputChange={setText}
    />
  );
};

export const WithDataFetch = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading, setNotLoading] = useBoolean(false);
  const [value, setValue] = useState<Array<ChipMultiSelectOption>>([]);
  const [options, setOptions] = useState<Array<ChipMultiSelectOption>>([]);

  const onChangeText = async (t: string) => {
    setText(t);
    setLoading();
    setTimeout(() => {
      setOptions(
        optionMocks.filter(
          (o) =>
            t.length > 0 &&
            o.label.toLocaleLowerCase().indexOf(t.toLocaleLowerCase()) >= 0,
        ),
      );
      setNotLoading();
    }, 500);
  };

  return (
    <ChipMultiSelect
      options={options}
      value={value}
      onValueChange={setValue}
      inputValue={text}
      onInputChange={onChangeText}
      loading={loading}
    />
  );
};
