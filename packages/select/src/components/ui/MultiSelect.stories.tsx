import { Column, Indent, Spacing } from "@stenajs-webui/core";
import * as React from "react";
import { MultiSelect } from "./MultiSelect";
import { useState } from "react";

export default {
  title: "select/MultiSelect",
  component: MultiSelect,
};

interface Option {
  value: string;
  label: string;
}

const OPTIONS: readonly Option[] = [
  {
    value: "Mattias",
    label: "Mattias",
  },
  {
    value: "Johan",
    label: "Johan",
  },
  {
    value: "Dennis the menace",
    label: "Dennis the menace",
  },
];

export const Standard = () => {
  return (
    <div style={{ width: "400px" }}>
      <MultiSelect options={OPTIONS} />
    </div>
  );
};

export const WithVariant = () => {
  const [value, setValue] = useState(OPTIONS);

  return (
    <Column width={400} gap={2}>
      {(["error", "warning", "success"] as const).map((variant) => (
        <MultiSelect
          variant={variant}
          options={OPTIONS}
          value={value}
          onChange={setValue}
        />
      ))}
    </Column>
  );
};

export const WithGroupHeadings = () => (
  <div style={{ width: "400px" }}>
    <Indent num={4}>
      <Spacing num={4}>
        <MultiSelect
          options={[
            {
              label: "Group heading 1",
              options: [
                {
                  value: "Mattias",
                  label: "Mattias",
                },
                {
                  value: "Johan",
                  label: "Johan",
                },
              ],
            },
            {
              label: "Group heading 2",
              options: [
                {
                  value: "Niklas",
                  label: "Niklas",
                },
                {
                  value: "Dennis the menace",
                  label: "Dennis the menace",
                },
              ],
            },
          ]}
        />
      </Spacing>
    </Indent>
  </div>
);

export const Disabled = () => (
  <div style={{ width: "400px" }}>
    <MultiSelect options={OPTIONS} isDisabled={true} />
  </div>
);
