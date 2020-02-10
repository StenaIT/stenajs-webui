import { Store, withState } from "@dump247/storybook-state";
import { Box, Column, HeaderText, Row, Space } from "@stenajs-webui/core";
import {
  Checkbox,
  NumericTextInput,
  RadioButton,
  StandardTextInput,
  Switch
} from "@stenajs-webui/forms";
import {
  DropdownOption,
  GroupedMultiSelect,
  Select
} from "@stenajs-webui/select";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { useEffect, useState } from "react";

interface State {
  checkbox: boolean;
  input: string;
  numericInput: string;
  radio: boolean;
  select?: string;
  groupedMultiSelect: readonly DropdownOption<string>[] | undefined;
  switch: boolean;
}

const FormOverview: React.FC<{ store: Store<State> }> = ({ store }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setIsEnabled(v => !v);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <Column>
      <div>
        <HeaderText>Checkbox</HeaderText>
        <table cellPadding={"5px"}>
          <thead>
            <tr>
              <th></th>
              <th>Clickable</th>
              <th>On</th>
              <th>Off</th>
              <th>Transition</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Enabled</td>
              <td>
                <Checkbox
                  value={store.state.checkbox}
                  onValueChange={value => store.set({ checkbox: value })}
                />
              </td>
              <td>
                <Checkbox value />
              </td>
              <td>
                <Checkbox value={false} />
              </td>
              <td>
                <Checkbox value={isEnabled} />
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td>
                <Checkbox
                  value={store.state.checkbox}
                  onValueChange={value => store.set({ checkbox: value })}
                  disabled
                />
              </td>
              <td>
                <Checkbox value disabled />
              </td>
              <td>
                <Checkbox value={false} disabled />
              </td>
              <td>
                <Checkbox value={isEnabled} disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Space num={4} />
      <div>
        <HeaderText>RadioButton</HeaderText>
        <table cellPadding={"5px"}>
          <thead>
            <tr>
              <th></th>
              <th>On</th>
              <th>Off</th>
              <th>Transition</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Enabled</td>
              <td>
                <RadioButton value />
              </td>
              <td>
                <RadioButton value={false} />
              </td>
              <td>
                <RadioButton value={isEnabled} />
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td>
                <RadioButton value disabled />
              </td>
              <td>
                <RadioButton value={false} disabled />
              </td>
              <td>
                <RadioButton value={isEnabled} disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Space num={4} />

      <div>
        <HeaderText>Switch</HeaderText>
        <table cellPadding={"5px"}>
          <thead>
            <tr>
              <th></th>
              <th>Clickable</th>
              <th>On</th>
              <th>Off</th>
              <th>Transition</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Enabled</td>
              <td>
                <Switch
                  onValueChange={value => store.set({ switch: value })}
                  value={store.state.switch}
                />
              </td>
              <td>
                <Switch value />
              </td>
              <td>
                <Switch value={false} />
              </td>
              <td>
                <Switch value={isEnabled} />
              </td>
            </tr>
            <tr>
              <td>Disabled</td>
              <td>
                <Switch
                  onValueChange={value => store.set({ switch: value })}
                  value={store.state.switch}
                  disabled
                />
              </td>
              <td>
                <Switch value disabled />
              </td>
              <td>
                <Switch value={false} disabled />
              </td>
              <td>
                <Switch value={isEnabled} disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Space num={4} />

      <div>
        <HeaderText>StandardTextInput</HeaderText>
        <Space />
        <Row>
          <table cellSpacing={"5px"}>
            <thead>
              <tr>
                <th>Enabled</th>
                <th>Disabled</th>
                <th>Background</th>
              </tr>
            </thead>
            <tbody>
              <td>
                <StandardTextInput
                  value={store.state.input}
                  onValueChange={value => store.set({ input: value })}
                />
              </td>
              <td>
                <StandardTextInput
                  value={store.state.input}
                  onValueChange={value => store.set({ input: value })}
                  disabled
                />
              </td>
              <td>
                <StandardTextInput
                  value={store.state.input}
                  onValueChange={value => store.set({ input: value })}
                  backgroundColor={"#ddddff"}
                />
              </td>
            </tbody>
          </table>
        </Row>
      </div>
      <Space />
      <div>
        <HeaderText>Select</HeaderText>
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
      </div>
      <Space />
      <div>
        <HeaderText>GroupedMultiSelect</HeaderText>
        <Space />
        <Box width={"200px"}>
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
      </div>
      <Space />
      <div>
        <HeaderText>NumericTextInput</HeaderText>
        <Space />
        <Box width={"200px"}>
          <NumericTextInput
            value={store.state.numericInput}
            onValueChange={value => store.set({ numericInput: value })}
          />
        </Box>
      </div>
    </Column>
  );
};

storiesOf("forms/", module).add(
  "Overview",
  withState<State>({
    checkbox: false,
    input: "",
    numericInput: "",
    radio: false,
    select: undefined,
    groupedMultiSelect: undefined,
    switch: false
  })(({ store }: { store: Store<State> }) => <FormOverview store={store} />)
);
