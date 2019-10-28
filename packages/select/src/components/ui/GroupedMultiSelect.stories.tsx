import { Store, withState } from "@dump247/storybook-state";
import { Box, Indent, Spacing } from "@stenajs-webui/core";
import {
  DropdownOption,
  GroupedMultiSelect,
  OnChange,
  selectThemeDark
} from "@stenajs-webui/select";
import { storiesOf } from "@storybook/react";
import * as React from "react";

interface State {
  values: DropdownOption<string>[] | undefined;
}

storiesOf("select/GroupedMultiSelect", module)
  .add(
    "standard",
    withState<State>({
      values: undefined
    })(({ store }: { store: Store<State> }) => {
      const onChange: OnChange<string> = options => {
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
    })
  )
  .add(
    "standard dark",
    withState<State>({
      values: undefined
    })(({ store }: { store: Store<State> }) => {
      const onChange: OnChange<string> = options => {
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
                  theme={selectThemeDark}
                  value={store.state.values}
                />
              </Spacing>
            </Indent>
          </Box>
        </div>
      );
    })
  )
  .add("disabled", () => (
    <div style={{ width: "400px" }}>
      <GroupedMultiSelect
        options={[
          {
            label: "CA",
            options: [
              {
                value: "Mattias",
                label: "Mattias"
              }
            ]
          },
          {
            label: "Freight",
            options: [
              {
                value: "Johan",
                label: "Johan"
              },
              {
                value: "Dennis the menace",
                label: "Dennis the menace"
              }
            ]
          }
        ]}
        isDisabled={true}
      />
    </div>
  ));
