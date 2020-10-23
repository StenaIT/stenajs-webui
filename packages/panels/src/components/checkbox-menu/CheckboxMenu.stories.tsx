import { ActionMenuItem, Label } from "@stenajs-webui/elements";
import { CheckboxMenu } from "@stenajs-webui/panels";
import * as React from "react";
import { useState } from "react";

export default {
  title: "panels/CheckboxMenu",
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
                setState({ ...state, unaccompanied: !state.accompanied });
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
  );
};
