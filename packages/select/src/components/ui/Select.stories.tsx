import { Box, Indent, Spacing } from "@stenajs-webui/core";
import * as React from "react";
import { Select } from "./Select";

export default {
  title: "select/Select",
  component: Select,
};

export const Standard = () => (
  <div style={{ width: "400px" }}>
    <Select
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

export const LongLabels = () => (
  <div style={{ width: "400px" }}>
    <Select
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

export const StandardDark = () => (
  <div style={{ width: "400px" }}>
    <Box background={"#2e4662"}>
      <Indent num={4}>
        <Spacing num={4}>
          <Select
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
            variant={"dark"}
          />
        </Spacing>
      </Indent>
    </Box>
  </div>
);

export const WithGroupHeadings = () => (
  <div style={{ width: "400px" }}>
    <Indent num={4}>
      <Spacing num={4}>
        <Select
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
    <Select
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
