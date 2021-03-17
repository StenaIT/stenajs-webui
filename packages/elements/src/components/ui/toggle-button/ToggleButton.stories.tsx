import { Row } from "@stenajs-webui/core";
import * as React from "react";
import { useState } from "react";
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

export const Standard = () => {
  const [state, setState] = useState<State>({});
  return (
    <Row>
      <ToggleButton
        label={"M"}
        pressed={state.mon}
        onClick={(mon) => setState({ ...state, mon })}
        first
      />
      <ToggleButton
        label={"T"}
        pressed={state.tue}
        onClick={(tue) => setState({ ...state, tue })}
      />
      <ToggleButton
        label={"W"}
        pressed={state.wed}
        onClick={(wed) => setState({ ...state, wed })}
      />
      <ToggleButton
        label={"T"}
        pressed={state.thu}
        onClick={(thu) => setState({ ...state, thu })}
      />
      <ToggleButton
        label={"F"}
        pressed={state.fri}
        onClick={(fri) => setState({ ...state, fri })}
      />
      <ToggleButton
        label={"S"}
        pressed={state.sat}
        onClick={(sat) => setState({ ...state, sat })}
      />
      <ToggleButton
        label={"S"}
        pressed={state.sun}
        onClick={(sun) => setState({ ...state, sun })}
        last
      />
    </Row>
  );
};
