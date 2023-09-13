import { faJedi } from "@fortawesome/free-solid-svg-icons/faJedi";
import { Heading, SeparatorLine, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { FlatButton } from "../buttons/FlatButton";
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
        <Heading variant={"h5"}>Subheader</Heading>
        <Space />
        <Text>Lorem ipsavablasfasofofa</Text>
      </CardyBody>
    </Cardy>
  );
};

export const HeaderContent = () => {
  return (
    <Cardy>
      <CardyHeader
        leftIcon={faJedi}
        text={"Overview"}
        right={<FlatButton label={"Create"} />}
      />
      <CardyBody>
        <Heading variant={"h5"}>Subheader</Heading>
        <Space />
        <Text>Lorem ipsavablasfasofofa</Text>
      </CardyBody>
      <SeparatorLine />
      <CardyBody>
        <Text>Line has no padding.</Text>
      </CardyBody>
    </Cardy>
  );
};
