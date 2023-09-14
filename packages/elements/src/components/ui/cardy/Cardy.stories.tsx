import { Text } from "@stenajs-webui/core";
import * as React from "react";
import { Cardy } from "./Cardy";
import { CardyHeader } from "./CardyHeader";
import { CardyBody } from "./CardyBody";

export default {
  title: "elements/Cardy",
  component: Cardy,
  subcomponents: { CardyHeader },
};

export const Demo = () => {
  return (
    <Cardy>
      <CardyHeader text={"Overview"} />
      <CardyBody>
        <Text>Lorem ipsavablasfasofofa</Text>
      </CardyBody>
    </Cardy>
  );
};

export const Loading = () => {
  return (
    <Cardy loading={true}>
      <CardyHeader text={"Overview"} />
      <CardyBody>
        <Text>Lorem ipsavablasfasofofa</Text>
      </CardyBody>
    </Cardy>
  );
};
