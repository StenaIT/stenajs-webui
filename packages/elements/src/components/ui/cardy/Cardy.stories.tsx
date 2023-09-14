import { Text } from "@stenajs-webui/core";
import * as React from "react";
import { Cardy } from "./Cardy";
import { CardyHeader } from "./CardyHeader";
import { CardyBody } from "./CardyBody";
import { Label } from "../label/Label";

export default {
  title: "elements/Cardy",
  component: Cardy,
  subcomponents: { CardyHeader },
};

export const Demo = () => {
  return (
    <Cardy>
      <CardyHeader text={"Overview"} />
      <CardyBody gap={2}>
        <Label text={"Intermodal route"}>
          <Text>Bettembourg - Eskilstuna</Text>
        </Label>
        <Label text={"Departure date"}>
          <Text>2022-04-15</Text>
        </Label>
        <Label text={"Departure time"}>
          <Text>18:00</Text>
        </Label>
      </CardyBody>
    </Cardy>
  );
};

export const Loading = () => {
  return (
    <Cardy loading={true}>
      <CardyHeader text={"Overview"} />
      <CardyBody gap={2}>
        <Label text={"Intermodal route"}>
          <Text>Bettembourg - Eskilstuna</Text>
        </Label>
        <Label text={"Departure date"}>
          <Text>2022-04-15</Text>
        </Label>
        <Label text={"Departure time"}>
          <Text>18:00</Text>
        </Label>
      </CardyBody>
    </Cardy>
  );
};
