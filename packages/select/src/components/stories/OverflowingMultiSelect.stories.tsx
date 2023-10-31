import { Column, Indent, Spacing } from "@stenajs-webui/core";
import * as React from "react";
import { OverflowingMultiSelect } from "../ui/OverflowingMultiSelect";

export default {
  title: "select/OverflowingMultiSelect",
  component: OverflowingMultiSelect,
};

export const Standard = () => (
  <div style={{ width: "400px" }}>
    <OverflowingMultiSelect
      options={[
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
      ]}
    />
  </div>
);

export const WithVariant = () => (
  <Column width={400} gap={2}>
    {(["error", "warning", "success"] as const).map((variant) => (
      <OverflowingMultiSelect
        variant={variant}
        options={[
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
        ]}
      />
    ))}
  </Column>
);

export const LongLabels = () => (
  <div style={{ width: "400px" }}>
    <OverflowingMultiSelect
      options={[
        {
          value: "lorem",
          label:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent purus massa, molestie ac sapien in, sodales interdum arcu",
        },
        {
          value: "Johan",
          label: "Johan",
        },
        {
          value: "Dennis the menace",
          label: "Dennis the menace",
        },
      ]}
    />
  </div>
);

export const WithGroupHeadings = () => (
  <div style={{ width: "400px" }}>
    <Indent num={4}>
      <Spacing num={4}>
        <OverflowingMultiSelect
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
    <OverflowingMultiSelect
      options={[
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
      ]}
      isDisabled={true}
    />
  </div>
);
