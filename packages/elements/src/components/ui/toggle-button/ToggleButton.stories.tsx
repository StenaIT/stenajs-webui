import * as React from "react";
import { useState } from "react";
import { ButtonGroup } from "../button-group/ButtonGroup";
import { ToggleButton } from "./ToggleButton";

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
        pressed={state.mon}
        onValueChange={(mon) => setState({ ...state, mon })}
      />
      <ToggleButton
        label={"Tuesday"}
        pressed={state.tue}
        onValueChange={(tue) => setState({ ...state, tue })}
      />
      <ToggleButton
        label={"Wednesday"}
        pressed={state.wed}
        onValueChange={(wed) => setState({ ...state, wed })}
      />
      <ToggleButton
        label={"Thursday"}
        pressed={state.thu}
        onValueChange={(thu) => setState({ ...state, thu })}
      />
      <ToggleButton
        label={"Friday"}
        pressed={state.fri}
        onValueChange={(fri) => setState({ ...state, fri })}
      />
      <ToggleButton
        label={"Saturday"}
        pressed={state.sat}
        onValueChange={(sat) => setState({ ...state, sat })}
      />
      <ToggleButton
        label={"Sunday"}
        pressed={state.sun}
        onValueChange={(sun) => setState({ ...state, sun })}
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
        pressed={state.mon}
        onValueChange={(mon) => setState({ ...state, mon })}
      />
      <ToggleButton
        label={"T"}
        pressed={state.tue}
        onValueChange={(tue) => setState({ ...state, tue })}
      />
      <ToggleButton
        label={"W"}
        pressed={state.wed}
        onValueChange={(wed) => setState({ ...state, wed })}
      />
      <ToggleButton
        label={"T"}
        pressed={state.thu}
        onValueChange={(thu) => setState({ ...state, thu })}
      />
      <ToggleButton
        label={"F"}
        pressed={state.fri}
        onValueChange={(fri) => setState({ ...state, fri })}
      />
      <ToggleButton
        label={"S"}
        pressed={state.sat}
        onValueChange={(sat) => setState({ ...state, sat })}
      />
      <ToggleButton
        label={"S"}
        pressed={state.sun}
        onValueChange={(sun) => setState({ ...state, sun })}
      />
    </ButtonGroup>
  );
};
