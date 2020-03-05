import { Store, withState } from "@dump247/storybook-state";
import {
  Box,
  Column,
  HeaderText,
  Row,
  SmallText,
  Space
} from "@stenajs-webui/core";
import {
  Checkbox,
  NumericTextInput,
  RadioButton,
  Switch,
  TextInput
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

const SwitchTable: React.FC<{ store: Store<State>; isEnabled: boolean }> = ({
  store,
  isEnabled
}) => {
  return (
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
  );
};
const RadioButtonTable: React.FC<{
  store: Store<State>;
  isEnabled: boolean;
}> = ({ store, isEnabled }) => {
  return (
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
            <RadioButton checked />
          </td>
          <td>
            <RadioButton checked={false} />
          </td>
          <td>
            <RadioButton checked={isEnabled} />
          </td>
        </tr>
        <tr>
          <td>Disabled</td>
          <td>
            <RadioButton checked disabled />
          </td>
          <td>
            <RadioButton checked={false} disabled />
          </td>
          <td>
            <RadioButton checked={isEnabled} disabled />
          </td>
        </tr>
        <tr>
          <td>
            <SmallText>Small</SmallText>
          </td>
        </tr>
        <tr>
          <td>Enabled</td>
          <td>
            <RadioButton size={"small"} checked />
          </td>
          <td>
            <RadioButton size={"small"} checked={false} />
          </td>
          <td>
            <RadioButton size={"small"} checked={isEnabled} />
          </td>
        </tr>
        <tr>
          <td>Disabled</td>
          <td>
            <RadioButton size={"small"} checked disabled />
          </td>
          <td>
            <RadioButton size={"small"} checked={false} disabled />
          </td>
          <td>
            <RadioButton size={"small"} checked={isEnabled} disabled />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const CheckboxTable: React.FC<{ store: Store<State>; isEnabled: boolean }> = ({
  store,
  isEnabled
}) => {
  return (
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
        <tr>
          <td>
            <SmallText>Small</SmallText>
          </td>
        </tr>
        <tr>
          <td>Enabled</td>
          <td>
            <Checkbox
              size={"small"}
              value={store.state.checkbox}
              onValueChange={value => store.set({ checkbox: value })}
            />
          </td>
          <td>
            <Checkbox size={"small"} value />
          </td>
          <td>
            <Checkbox size={"small"} value={false} />
          </td>
          <td>
            <Checkbox size={"small"} value={isEnabled} />
          </td>
        </tr>
        <tr>
          <td>Disabled</td>
          <td>
            <Checkbox
              size={"small"}
              value={store.state.checkbox}
              onValueChange={value => store.set({ checkbox: value })}
              disabled
            />
          </td>
          <td>
            <Checkbox size={"small"} value disabled />
          </td>
          <td>
            <Checkbox size={"small"} value={false} disabled />
          </td>
          <td>
            <Checkbox size={"small"} value={isEnabled} disabled />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
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
      <Row>
        <Column>
          <HeaderText>Checkbox</HeaderText>
          <CheckboxTable store={store} isEnabled={isEnabled} />
        </Column>
        <Space num={4} />
        <Column>
          <HeaderText>RadioButton</HeaderText>
          <RadioButtonTable store={store} isEnabled={isEnabled} />
        </Column>
        <Space num={4} />
        <Column>
          <HeaderText>Switch</HeaderText>
          <SwitchTable store={store} isEnabled={isEnabled} />
        </Column>
      </Row>

      <Space num={4} />

      <div>
        <HeaderText>TextInput</HeaderText>
        <Space />
        <Row>
          <table cellSpacing={"5px"}>
            <thead>
              <tr>
                <th>Enabled</th>
                <th>Disabled</th>
                <th>Variant</th>
              </tr>
            </thead>
            <tbody>
              <td>
                <TextInput
                  value={store.state.input}
                  onValueChange={value => store.set({ input: value })}
                />
              </td>
              <td>
                <TextInput
                  value={store.state.input}
                  onValueChange={value => store.set({ input: value })}
                  disabled
                />
              </td>
              <td>
                <TextInput
                  value={store.state.input}
                  onValueChange={value => store.set({ input: value })}
                  variant={"error"}
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
