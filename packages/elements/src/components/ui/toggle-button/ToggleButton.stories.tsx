import * as React from "react";
import { useState } from "react";
import { ToggleButton, ToggleButtonSize } from "./ToggleButton";
import { Column } from "@stenajs-webui/core";
import { ButtonGroup } from "../button-group/ButtonGroup";

export default {
  title: "elements/ToggleButton",
  component: ToggleButton,
};

interface State {
  mon?: boolean;
  tue?: boolean;
  wed?: boolean;
  thu?: boolean;
  fri?: boolean;
  sat?: boolean;
  sun?: boolean;
}

export const Weekdays = () => {
  const [state, setState] = useState<State>({});

  return (
    <ButtonGroup>
      <ToggleButton
        label={"Monday"}
        onValueChange={(mon) => setState({ ...state, mon })}
        value={state.mon}
      />
      <ToggleButton
        label={"Tuesday"}
        onValueChange={(tue) => setState({ ...state, tue })}
        value={state.tue}
      />
      <ToggleButton
        label={"Wednesday"}
        onValueChange={(wed) => setState({ ...state, wed })}
        value={state.wed}
      />
      <ToggleButton
        label={"Thursday"}
        onValueChange={(thu) => setState({ ...state, thu })}
        value={state.thu}
      />
      <ToggleButton
        label={"Friday"}
        onValueChange={(fri) => setState({ ...state, fri })}
        value={state.fri}
      />
      <ToggleButton
        label={"Saturday"}
        onValueChange={(sat) => setState({ ...state, sat })}
        value={state.sat}
      />
      <ToggleButton
        label={"Sunday"}
        onValueChange={(sun) => setState({ ...state, sun })}
        value={state.sun}
        disabled
      />
    </ButtonGroup>
  );
};

export const ShortWeekdays = () => {
  const [state, setState] = useState<State>({});

  return (
    <ButtonGroup>
      <ToggleButton
        label={"M"}
        onValueChange={(mon) => setState({ ...state, mon })}
        value={state.mon}
      />
      <ToggleButton
        label={"T"}
        onValueChange={(tue) => setState({ ...state, tue })}
        value={state.tue}
      />
      <ToggleButton
        label={"W"}
        onValueChange={(wed) => setState({ ...state, wed })}
        value={state.wed}
      />
      <ToggleButton
        label={"T"}
        onValueChange={(thu) => setState({ ...state, thu })}
        value={state.thu}
      />
      <ToggleButton
        label={"F"}
        onValueChange={(fri) => setState({ ...state, fri })}
        value={state.fri}
      />
      <ToggleButton
        label={"S"}
        onValueChange={(sat) => setState({ ...state, sat })}
        value={state.sat}
      />
      <ToggleButton
        label={"S"}
        onValueChange={(sun) => setState({ ...state, sun })}
        value={state.sun}
        disabled
      />
    </ButtonGroup>
  );
};

export const Sizes = () => {
  const [state, setState] = useState<State>({});
  const sizes: Array<ToggleButtonSize> = ["small", "medium", "large"];
  return (
    <Column gap={4}>
      {sizes.map((size) => (
        <ButtonGroup>
          <ToggleButton
            label={"Monday"}
            onValueChange={(mon) => setState({ ...state, mon })}
            value={state.mon}
            size={size}
          />
          <ToggleButton
            label={"Tuesday"}
            onValueChange={(tue) => setState({ ...state, tue })}
            value={state.tue}
            size={size}
          />
          <ToggleButton
            label={"Wednesday"}
            onValueChange={(wed) => setState({ ...state, wed })}
            value={state.wed}
            size={size}
          />
          <ToggleButton
            label={"Thursday"}
            onValueChange={(thu) => setState({ ...state, thu })}
            value={state.thu}
            size={size}
          />
          <ToggleButton
            label={"Friday"}
            onValueChange={(fri) => setState({ ...state, fri })}
            value={state.fri}
            size={size}
          />
          <ToggleButton
            label={"Saturday"}
            onValueChange={(sat) => setState({ ...state, sat })}
            value={state.sat}
            size={size}
          />
          <ToggleButton
            label={"Sunday"}
            onValueChange={(sun) => setState({ ...state, sun })}
            value={state.sun}
            size={size}
            disabled
          />
        </ButtonGroup>
      ))}
    </Column>
  );
};
