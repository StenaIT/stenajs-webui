import { ActionMenuItem, Icon, Label } from "@stenajs-webui/elements";
import * as React from "react";
import { useState } from "react";
import { Column, Indent, Row, Space, Spacing, Text } from "@stenajs-webui/core";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { CheckboxMenu } from "./CheckboxMenu";

export default {
  title: "panels/CheckboxMenu",
  component: CheckboxMenu,
};

interface State {
  accompanied?: boolean;
  unaccompanied?: boolean;
  vehicleTypeIsNull?: boolean;
}

export const Standard = () => {
  const [state, setState] = useState<State>({});
  const allSelected =
    state.accompanied && state.unaccompanied && state.vehicleTypeIsNull;
  const someSelected =
    state.accompanied || state.unaccompanied || state.vehicleTypeIsNull;

  const onClickCheckbox = () => {
    if (someSelected) {
      setState({});
    } else {
      setState({
        vehicleTypeIsNull: true,
        unaccompanied: true,
        accompanied: true,
      });
    }
  };
  return (
    <Column>
      <Label text={"Select rows"}>
        <CheckboxMenu
          value={allSelected}
          indeterminate={!allSelected && someSelected}
          onValueChange={onClickCheckbox}
          renderMenu={(close) => (
            <>
              <ActionMenuItem
                label={"Accompanied"}
                onClick={() => {
                  setState({ ...state, accompanied: !state.accompanied });
                  close();
                }}
              />
              <ActionMenuItem
                label={"Unaccompanied"}
                onClick={() => {
                  setState({ ...state, unaccompanied: !state.unaccompanied });
                  close();
                }}
              />
              <ActionMenuItem
                label={"Vehicle type = all"}
                onClick={() => {
                  setState({
                    ...state,
                    vehicleTypeIsNull: !state.vehicleTypeIsNull,
                  });
                  close();
                }}
              />
            </>
          )}
        />
      </Label>
      <Spacing num={4} />

      <Row>
        <Icon icon={state.accompanied ? faCheckCircle : faCircle} />
        <Indent />
        <Text>accompanied</Text>
      </Row>
      <Space />
      <Row>
        <Icon icon={state.unaccompanied ? faCheckCircle : faCircle} />
        <Indent />
        <Text>unaccompanied</Text>
      </Row>
      <Space />
      <Row>
        <Icon icon={state.vehicleTypeIsNull ? faCheckCircle : faCircle} />
        <Indent />
        <Text>vehicleTypeIsNull</Text>
      </Row>
    </Column>
  );
};
