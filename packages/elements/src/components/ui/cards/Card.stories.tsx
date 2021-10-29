import { faCheckSquare } from "@fortawesome/free-solid-svg-icons/faCheckSquare";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons/faCreditCard";
import { faJedi } from "@fortawesome/free-solid-svg-icons/faJedi";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import {
  Heading,
  Indent,
  Row,
  SeparatorLine,
  Space,
  Txt,
} from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { FlatButton } from "../buttons/FlatButton";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { Icon } from "../icon/Icon";
import { Tag } from "../tag/Tag";
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
      <CardHeader text={"Overview"} />
      <CardBody>
        <Heading variant={"h5"}>Subheader</Heading>
        <Space />
        <Txt>Lorem ipsavablasfasofofa</Txt>
      </CardBody>
    </Card>
  );
};

export const HeaderContent = () => {
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
        <Txt>Lorem ipsavablasfasofofa</Txt>
      </CardBody>
      <SeparatorLine />
      <CardBody>
        <Txt>Line has no padding.</Txt>
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
        <Txt>Lorem ipsavablasfasofofa</Txt>
      </CardBody>
      <SeparatorLine />
      <CardBody>
        <Txt>Line has no padding.</Txt>
      </CardBody>
    </Card>
  );
};

export const Details = () => {
  return (
    <Card>
      <CardHeader
        variant={"compact"}
        text={"Booking details"}
        contentAfterHeading={<Heading variant={"h4"}>7133842</Heading>}
        contentCenter={
          <Row alignItems={"center"}>
            <Icon icon={faCircle} color={cssColor("--lhds-color-green-600")} />
            <Space />
            <Txt>Confirmed</Txt>
            <Indent num={2} />
            <Icon
              icon={faCreditCard}
              color={cssColor("--lhds-color-orange-600")}
            />
            <Space />
            <Txt>Partially paid</Txt>
          </Row>
        }
        contentRight={
          <Row alignItems={"center"}>
            <SecondaryButton label={"Booking actions"} />
            <Indent />
            <FlatButton leftIcon={faTimes} />
          </Row>
        }
      />
      <CardBody>
        <Heading variant={"h5"}>Subheader</Heading>
        <Space />
        <Txt>Lorem ipsavablasfasofofa</Txt>
      </CardBody>
      <SeparatorLine />
      <CardBody>
        <Txt>Line has no padding.</Txt>
      </CardBody>
    </Card>
  );
};

export const Unpaid = () => {
  return (
    <Card>
      <CardHeader
        text={"71338164"}
        contentLeft={<Tag label={"Unpaid"} variant={"error"} />}
        contentRight={<FlatButton leftIcon={faTimes} />}
      />
      <CardBody>
        <Heading variant={"h5"}>Subheader</Heading>
        <Space />
        <Txt>Lorem ipsavablasfasofofa</Txt>
      </CardBody>
      <SeparatorLine />
      <CardBody>
        <Txt>Line has no padding.</Txt>
      </CardBody>
    </Card>
  );
};

export const Switch = () => {
  return (
    <Card>
      <CardHeader
        variant={"compact"}
        text={"Switch booking: 71338164"}
        contentAfterHeading={
          <Row>
            <Icon icon={faCircle} color={cssColor("--lhds-color-green-600")} />
            <Space />
            <Txt>Confirmed</Txt>
          </Row>
        }
        contentRight={<FlatButton leftIcon={faTimes} />}
      />
      <CardBody>
        <Heading variant={"h5"}>Subheader</Heading>
        <Space />
        <Txt>Lorem ipsavablasfasofofa</Txt>
      </CardBody>
      <SeparatorLine />
      <CardBody>
        <Txt>Line has no padding.</Txt>
      </CardBody>
    </Card>
  );
};

export const Approved = () => {
  return (
    <Card>
      <CardHeader
        variant={"compact"}
        text={"Approved"}
        contentLeft={
          <Icon
            icon={faCheckSquare}
            size={26}
            color={cssColor("--lhds-color-green-600")}
          />
        }
        contentRight={<FlatButton leftIcon={faTimes} />}
      />
      <CardBody>
        <Heading variant={"h5"}>Subheader</Heading>
        <Space />
        <Txt>Lorem ipsavablasfasofofa</Txt>
      </CardBody>
      <SeparatorLine />
      <CardBody>
        <Txt>Line has no padding.</Txt>
      </CardBody>
    </Card>
  );
};

export const Elevation = () => {
  return (
    <Card elevation={"large"}>
      <CardHeader variant={"compact"} text={"Elevation"} />
      <CardBody>
        <Txt>With more elevation</Txt>
      </CardBody>
    </Card>
  );
};
