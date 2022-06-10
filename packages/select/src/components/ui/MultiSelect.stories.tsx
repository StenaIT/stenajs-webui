import { Box, Indent, Spacing } from "@stenajs-webui/core";
import * as React from "react";
import { MultiSelect } from "./MultiSelect";

export default {
  title: "select/MultiSelect",
  component: MultiSelect,
};

export const Standard = () => (
  <div style={{ width: "400px" }}>
    <MultiSelect
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
  <div style={{ width: "400px" }}>
    <MultiSelect
      textVariant={"error"}
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

export const MultiselectDark = () => (
  <div style={{ width: "600px" }}>
    <Box background={"#2e4662"}>
      <Indent num={4}>
        <Spacing num={4}>
          <MultiSelect
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

export const Disabled = () => (
  <div style={{ width: "400px" }}>
    <MultiSelect
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
