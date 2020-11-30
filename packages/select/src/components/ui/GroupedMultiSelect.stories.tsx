import { Box, Indent, Spacing } from "@stenajs-webui/core";
import * as React from "react";
import { useState } from "react";
import {
  DropdownOption,
  GroupedMultiSelect,
  OnChange,
} from "./GroupedMultiSelect";

export default {
  title: "select/GroupedMultiSelect",
  component: GroupedMultiSelect,
};

export const Standard = () => {
  const [value, setValue] = useState<
    readonly DropdownOption<string>[] | undefined
  >(undefined);

  const onChange: OnChange<string> = (
    options: readonly DropdownOption<string>[] | undefined
  ) => {
    setValue(options);
  };

  return (
    <div style={{ width: "400px" }}>
      <GroupedMultiSelect
        onChange={onChange}
        options={[
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
        ]}
        value={value}
      />
    </div>
  );
};

export const StandardDark = () => {
  const [value, setValue] = useState<
    readonly DropdownOption<string>[] | undefined
  >(undefined);

  const onChange: OnChange<string> = (
    options: readonly DropdownOption<string>[] | undefined
  ) => {
    setValue(options);
  };
  return (
    <div style={{ width: "600px" }}>
      <Box background={"#2e4662"}>
        <Indent num={4}>
          <Spacing num={4}>
            <GroupedMultiSelect
              onChange={onChange}
              options={[
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
              ]}
              variant={"dark"}
              value={value}
            />
          </Spacing>
        </Indent>
      </Box>
    </div>
  );
};

export const Disabled = () => (
  <div style={{ width: "400px" }}>
    <GroupedMultiSelect
      onChange={() => {}}
      value={undefined}
      options={[
        {
          label: "CA",
          options: [
            {
              data: "Mattias",
              label: "Mattias",
              value: "Mattias",
            },
          ],
        },
        {
          label: "Freight",
          options: [
            {
              data: "Johan",
              label: "Johan",
              value: "Johan",
            },
            {
              data: "Dennis the menace",
              label: "Dennis the menace",
              value: "Dennis the menace",
            },
          ],
        },
      ]}
      isDisabled={true}
    />
  </div>
);
