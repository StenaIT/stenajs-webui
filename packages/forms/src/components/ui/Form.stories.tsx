import { Box, Column, Heading, Row, Space, Text } from "@stenajs-webui/core";
import {
  DropdownOption,
  GroupedMultiSelect,
  Select,
} from "@stenajs-webui/select";
import * as React from "react";
import { useEffect, useState } from "react";
import { Switch } from "./switch/Switch";
import { RadioButton } from "./radio/RadioButton";
import { Checkbox } from "./checkbox/Checkbox";
import { TextInput } from "./text-input/TextInput";
import { NumericTextInput } from "./numeric-text-input/NumericTextInput";

export default {
  title: "forms",
};

const SwitchTable: React.FC<{ isEnabled: boolean }> = ({ isEnabled }) => {
  const [checked, setChecked] = useState(false);
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
            <Switch onValueChange={setChecked} value={checked} />
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
            <Switch onValueChange={setChecked} value={checked} disabled />
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
  isEnabled: boolean;
}> = ({ isEnabled }) => {
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
            <Text size={"small"}>Small</Text>
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

const CheckboxTable: React.FC<{ isEnabled: boolean }> = ({ isEnabled }) => {
  const [checked, setChecked] = useState(false);
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
            <Checkbox value={checked} onValueChange={setChecked} />
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
            <Checkbox value={checked} onValueChange={setChecked} disabled />
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
            <Text size={"small"}>Small</Text>
          </td>
        </tr>
        <tr>
          <td>Enabled</td>
          <td>
            <Checkbox
              size={"small"}
              value={checked}
              onValueChange={setChecked}
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
              value={checked}
              onValueChange={setChecked}
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

export const Overview = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [value, setValue] = useState("");
  const [numeric, setNumeric] = useState("");
  const [selected, setSelected] = useState<string | undefined | null>(
    undefined
  );
  const [grouped, setGrouped] = useState<
    readonly DropdownOption<string>[] | undefined
  >(undefined);
  useEffect(() => {
    const t = setInterval(() => {
      setIsEnabled((v) => !v);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <Column>
      <Row>
        <Column>
          <Heading>Checkbox</Heading>
          <CheckboxTable isEnabled={isEnabled} />
        </Column>
        <Space num={4} />
        <Column>
          <Heading>RadioButton</Heading>
          <RadioButtonTable isEnabled={isEnabled} />
        </Column>
        <Space num={4} />
        <Column>
          <Heading>Switch</Heading>
          <SwitchTable isEnabled={isEnabled} />
        </Column>
      </Row>

      <Space num={4} />

      <div>
        <Heading>TextInput</Heading>
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
              <tr>
                <td>
                  <TextInput value={value} onValueChange={setValue} />
                </td>
                <td>
                  <TextInput value={value} onValueChange={setValue} disabled />
                </td>
                <td>
                  <TextInput
                    value={value}
                    onValueChange={setValue}
                    variant={"error"}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Row>
      </div>
      <Space />
      <div>
        <Heading>Select</Heading>
        <Space />
        <Box width={"200px"}>
          <Select
            onChange={setSelected as any}
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
            value={selected as any}
            width={"200px"}
          />
        </Box>
      </div>
      <Space />
      <div>
        <Heading>GroupedMultiSelect</Heading>
        <Space />
        <Box width={"200px"}>
          <GroupedMultiSelect
            onChange={setGrouped}
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
            value={grouped}
          />
        </Box>
      </div>
      <Space />
      <div>
        <Heading>NumericTextInput</Heading>
        <Space />
        <Box width={"200px"}>
          <NumericTextInput value={numeric} onValueChange={setNumeric} />
        </Box>
      </div>
    </Column>
  );
};
