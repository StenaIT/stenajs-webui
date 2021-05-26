import { faJedi } from "@fortawesome/free-solid-svg-icons/faJedi";
import { Heading, SeparatorLine, Space, Text } from "@stenajs-webui/core";
import * as React from "react";
import { FlatButton } from "../buttons/FlatButton";
import { Card } from "./Card";
import { CardBody } from "./CardBody";
import { CardHeader } from "./CardHeader";

export default {
  title: "elements/Card",
  component: Card,
  subcomponents: { CardHeader },
};

export const Demo = () => {
  return (
    <Card>
      <CardHeader
        text={"Overview"}
        contentAfterHeading={<FlatButton leftIcon={faJedi} />}
        contentRight={<FlatButton label={"Create"} />}
      />
      <CardBody>
        <Heading variant={"h5"}>Subheader</Heading>
        <Space />
        <Text>Lorem ipsavablasfasofofa</Text>
      </CardBody>
      <SeparatorLine />
      <CardBody>
        <Text>Line has no padding.</Text>
      </CardBody>
    </Card>
  );
};

export const CompactHeader = () => {
  return (
    <Card>
      <CardHeader
        variant={"compact"}
        text={"Overview"}
        contentAfterHeading={<FlatButton leftIcon={faJedi} />}
        contentRight={<FlatButton label={"Create"} />}
      />
      <CardBody>
        <Heading variant={"h5"}>Subheader</Heading>
        <Space />
        <Text>Lorem ipsavablasfasofofa</Text>
      </CardBody>
      <SeparatorLine />
      <CardBody>
        <Text>Line has no padding.</Text>
      </CardBody>
    </Card>
  );
};
