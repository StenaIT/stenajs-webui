import * as React from "react";
import { RadioButtonBox } from "./RadioButtonBox";
import { Column } from "@stenajs-webui/core";
import {
  stenaAnimals,
  stenaRunningPerson,
  stenaVehicleCarStandard,
} from "@stenajs-webui/elements";

export default {
  title: "forms/RadioButtonBox",
  component: RadioButtonBox,
};

export const Overview = () => (
  <Column gap={2} width={"300px"}>
    <RadioButtonBox
      label={"On foot"}
      name={"meansOfTravel"}
      value={"onFoot"}
      icon={stenaRunningPerson}
    />
    <RadioButtonBox
      label={"With vehicle"}
      name={"meansOfTravel"}
      value={"withVehicle"}
      icon={stenaVehicleCarStandard}
    />
    <RadioButtonBox
      label={"With sharks"}
      name={"meansOfTravel"}
      value={"withSharks"}
      variant={"danger"}
      icon={stenaAnimals}
    />
    <RadioButtonBox
      label={"With styling"}
      name={"meansOfTravel"}
      value={"withBg"}
      style={{
        ["--swui-radio-button-box-background" as string]:
          "var(--lhds-color-blue-200)",
        ["--swui-radio-button-box-border-color" as string]:
          "var(--lhds-color-blue-300)",
      }}
      icon={stenaAnimals}
    />
  </Column>
);
