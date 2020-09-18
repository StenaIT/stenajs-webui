import { Store, withState } from "@dump247/storybook-state";
import { Box, Indent, Spacing } from "@stenajs-webui/core";
import {
  DropdownOption,
  GroupedMultiSelect,
  OnChange
} from "@stenajs-webui/select";
import * as React from "react";

interface State {
  values: readonly DropdownOption<string>[] | undefined;
}

export default {
  title: "select/GroupedMultiSelect"
};

export const Standard = withState<State>({
  values: undefined
})(({ store }: { store: Store<State> }) => {
  const onChange: OnChange<string> = (
    options: readonly DropdownOption<string>[] | undefined
  ) => {
    store.set({ values: options });
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
                data: "Mattias"
              }
            ]
          },
          {
            label: "Freight",
            options: [
              {
                value: "Johan",
                label: "Johan",
                data: "Johan"
              },
              {
                value: "Dennis the menace",
                label: "Dennis the menace",
                data: "Dennis the menace"
              }
            ]
          }
        ]}
        value={store.state.values}
      />
    </div>
  );
});

Standard.storyName = "standard";

export const StandardDark = withState<State>({
  values: undefined
})(({ store }: { store: Store<State> }) => {
  const onChange: OnChange<string> = (
    options: readonly DropdownOption<string>[] | undefined
  ) => {
    store.set({ values: options });
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
                      data: "Mattias"
                    }
                  ]
                },
                {
                  label: "Freight",
                  options: [
                    {
                      value: "Johan",
                      label: "Johan",
                      data: "Johan"
                    },
                    {
                      value: "Dennis the menace",
                      label: "Dennis the menace",
                      data: "Dennis the menace"
                    }
                  ]
                }
              ]}
              variant={"dark"}
              value={store.state.values}
            />
          </Spacing>
        </Indent>
      </Box>
    </div>
  );
});

StandardDark.storyName = "standard dark";

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
              value: "Mattias"
            }
          ]
        },
        {
          label: "Freight",
          options: [
            {
              data: "Johan",
              label: "Johan",
              value: "Johan"
            },
            {
              data: "Dennis the menace",
              label: "Dennis the menace",
              value: "Dennis the menace"
            }
          ]
        }
      ]}
      isDisabled={true}
    />
  </div>
);

Disabled.storyName = "disabled";
