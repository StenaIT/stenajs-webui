import { useBoolean } from "@stenajs-webui/core";
import { Story } from "@storybook/react";
import { useState } from "react";
import * as React from "react";
import { ChipMultiSelect, ChipMultiSelectValue } from "./ChipMultiSelect";

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

const optionMocks = [
  { value: "1", label: "Kalle" },
  { value: "2", label: "Joakim" },
  { value: "3", label: "Kajsa" },
  { value: "4", label: "Knatte" },
  { value: "5", label: "Fnatte" },
  { value: "6", label: "Tjatte" },
  { value: "7", label: "Janne" },
];

export const PrefetchedData = () => {
  const [text, setText] = useState<string>("");
  const [value, setValue] = useState<Array<ChipMultiSelectValue>>([]);

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

export const WithDataFetch = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading, setNotLoading] = useBoolean(false);
  const [value, setValue] = useState<Array<ChipMultiSelectValue>>([]);
  const [options, setOptions] = useState<Array<ChipMultiSelectValue>>([]);

  const onChangeText = async (t: string) => {
    setText(t);
    setLoading();
    setTimeout(() => {
      setOptions(
        optionMocks.filter(
          (o) =>
            t.length > 0 &&
            o.label.toLocaleLowerCase().indexOf(t.toLocaleLowerCase()) >= 0
        )
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
