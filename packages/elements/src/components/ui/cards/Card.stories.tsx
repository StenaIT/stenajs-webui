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
  Text,
} from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { FlatButton } from "../buttons/FlatButton";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { Icon } from "../icon/Icon";
import { Tag } from "../tag/Tag";
import { Card } from "./Card";
import { CardBody, CardBodyVariant } from "./CardBody";
import { CardHeader } from "./CardHeader";
import { CardWrapper } from "./CardWrapper";
import styled from "@emotion/styled";

export default {
  title: "elements/Card",
  component: Card,
  parameters: {
    layout: "fullscreen",
  },
  subcomponents: { CardHeader, CardWrapper, CardBody },
};

export const Demo = () => {
  return (
    <Card>
      <CardHeader text={"Overview"} />
      <CardBody>
        <Heading variant={"h5"}>Subheader</Heading>
        <Space />
        <Text>Lorem ipsavablasfasofofa</Text>
      </CardBody>
    </Card>
  );
};

const GridCardWrapper = styled(CardWrapper)`
  display: grid;
  grid-template-rows: auto;
  background: var(--lhds-color-ui-200);
  grid-template-columns: 1fr;
  grid-template-areas:
    "header1"
    "header2"
    "header3"
    "subheader1"
    "subheader2"
    "main";

  @media (min-width: 52em) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-areas:
      "header1 header1 header2 header2 header3 header3"
      "subheader1 subheader1 subheader1 subheader2 subheader2 subheader2"
      "main main main main main main";
  }
`;

const variant: CardBodyVariant = "compact";

export const ResponsiveDemo = () => {
  return (
    <GridCardWrapper display={"grid"}>
      <Card gridArea={"header1"}>
        <CardHeader text={"Shoulder"} variant={variant} />
        <CardBody variant={variant}>
          <Text>Shoulder</Text>
        </CardBody>
      </Card>
      <Card gridArea={"header2"}>
        <CardHeader text={"Off-peak"} variant={variant} />
        <CardBody variant={variant}>
          <Text>Off-peak</Text>
        </CardBody>
      </Card>
      <Card gridArea={"header3"}>
        <CardHeader text={"Peak"} variant={variant} />
        <CardBody variant={variant}>
          <Text>Peak</Text>
        </CardBody>
      </Card>
      <Card gridArea={"subheader1"}>
        <CardHeader text={"Niklas"} variant={variant} />
        <CardBody variant={variant}>
          <Text>Niklas</Text>
        </CardBody>
      </Card>
      <Card gridArea={"subheader2"}>
        <CardHeader text={"Johan"} variant={variant} />
        <CardBody variant={variant}>
          <Text>Johan</Text>
        </CardBody>
      </Card>
      <Card gridArea={"main"}>
        <CardHeader text={"Overview"} variant={variant} />
        <CardBody variant={variant}>
          <Heading variant={"h5"}>Subheader</Heading>
          <Space />
          <Text>Lorem ipsavablasfasofofa</Text>
        </CardBody>
      </Card>
    </GridCardWrapper>
  );
};

export const HeaderContent = () => {
  return (
    <Card>
      <CardHeader
        leftIcon={faJedi}
        text={"Overview"}
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

export const CompactCard = () => {
  return (
    <Card>
      <CardHeader
        leftIcon={faJedi}
        variant={"compact"}
        text={"Overview"}
        contentRight={<FlatButton label={"Create"} />}
      />
      <CardBody variant={"compact"}>
        <Heading variant={"h5"}>Subheader</Heading>
        <Space />
        <Text>Lorem ipsavablasfasofofa</Text>
      </CardBody>
      <SeparatorLine />
      <CardBody variant={"compact"}>
        <Text>Line has no padding.</Text>
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
            <Text>Confirmed</Text>
            <Indent num={2} />
            <Icon
              icon={faCreditCard}
              color={cssColor("--lhds-color-orange-600")}
            />
            <Space />
            <Text>Partially paid</Text>
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
        <Text>Lorem ipsavablasfasofofa</Text>
      </CardBody>
      <SeparatorLine />
      <CardBody>
        <Text>Line has no padding.</Text>
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
        <Text>Lorem ipsavablasfasofofa</Text>
      </CardBody>
      <SeparatorLine />
      <CardBody>
        <Text>Line has no padding.</Text>
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
            <Text>Confirmed</Text>
          </Row>
        }
        contentRight={<FlatButton leftIcon={faTimes} />}
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
        <Text>Lorem ipsavablasfasofofa</Text>
      </CardBody>
      <SeparatorLine />
      <CardBody>
        <Text>Line has no padding.</Text>
      </CardBody>
    </Card>
  );
};
