import * as React from "react";
import { RadioButtonBox } from "./RadioButtonBox";
import { Column, Heading, Text } from "@stenajs-webui/core";
import {
  stenaAnimals,
  stenaRunningPerson,
  stenaVehicleCarStandard,
} from "@stenajs-webui/elements";

export default {
  title: "forms/RadioButtonBox",
  component: RadioButtonBox,
};

export const Overview = () => {
  const sizes = ["medium", "large"] as const;

  return (
    <Column gap={4}>
      {sizes.map((size) => (
        <Column gap={2} width={"300px"}>
          <Heading>{size}</Heading>
          <RadioButtonBox
            size={size}
            label={"On foot"}
            name={"meansOfTravel"}
            value={"onFoot"}
            icon={stenaRunningPerson}
          />
          <RadioButtonBox
            size={size}
            label={"With vehicle"}
            name={"meansOfTravel"}
            value={"withVehicle"}
            icon={stenaVehicleCarStandard}
          />
          <RadioButtonBox
            size={size}
            label={"With sharks"}
            name={"meansOfTravel"}
            value={"withSharks"}
            variant={"danger"}
            icon={stenaAnimals}
          />
          <RadioButtonBox
            size={size}
            label={"With content right"}
            name={"meansOfTravel"}
            value={"withContentRight"}
            contentRight={<Text>Hello world</Text>}
          />
          <RadioButtonBox
            size={size}
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
      ))}
    </Column>
  );
};
