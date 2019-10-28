import { Store, withState } from "@dump247/storybook-state";
import {
  Box,
  Column,
  defaultTheme,
  Row,
  Space,
  ThemeProvider
} from "@stenajs-webui/core";
import {
  Checkbox,
  NumericTextInput,
  StandardTextInput,
  Switch
} from "@stenajs-webui/forms";
import {
  DropdownOption,
  GroupedMultiSelect,
  Select
} from "@stenajs-webui/select";
import * as knobs from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import * as React from "react";

interface State {
  checkbox: boolean;
  input: string;
  numericInput: string;
  radio: boolean;
  select?: string;
  groupedMultiSelect?: DropdownOption<string>[];
  switch: boolean;
}

const disabled = knobs.boolean("Disabled", false);

storiesOf("forms/", module).add(
  "all",
  withState<State>({
    checkbox: false,
    input: "",
    numericInput: "",
    radio: false,
    select: undefined,
    groupedMultiSelect: undefined,
    switch: false
  })(({ store }: { store: Store<State> }) => (
    <ThemeProvider value={defaultTheme}>
      <Column>
        <Checkbox
          value={store.state.checkbox}
          onValueChange={value => store.set({ checkbox: value })}
          disabled={disabled}
        />
        <Space />
        <Switch
          onValueChange={value => store.set({ switch: value })}
          value={store.state.switch}
          disabled={disabled}
        />
        <Space />
        <Row>
          <Box width={"200px"}>
            <StandardTextInput
              value={store.state.input}
              onValueChange={value => store.set({ input: value })}
            />
          </Box>
          <Space />
          <Box width={"200px"}>
            <Select
              onChange={(value: string) => store.set({ select: value })}
              options={[
                {
                  value: "Mattias",
                  label: "Mattias"
                },
                {
                  value: "Johan",
                  label: "Johan"
                },
                {
                  value: "Dennis the menace",
                  label: "Dennis the menace"
                }
              ]}
              value={store.state.select}
              width={"200px"}
            />
          </Box>
        </Row>
        <Space />
        <Row>
          <Box width={"410px"}>
            <GroupedMultiSelect
              onChange={value => store.set({ groupedMultiSelect: value })}
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
              value={store.state.groupedMultiSelect}
            />
          </Box>
          <Space />
          <Box width={"200px"}>
            <NumericTextInput
              value={store.state.numericInput}
              onValueChange={value => store.set({ numericInput: value })}
            />
          </Box>
        </Row>
      </Column>
    </ThemeProvider>
  ))
);
