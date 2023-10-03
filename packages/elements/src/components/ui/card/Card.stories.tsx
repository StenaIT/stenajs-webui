import { faCheckSquare } from "@fortawesome/free-solid-svg-icons/faCheckSquare";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons/faCreditCard";
import { faJedi } from "@fortawesome/free-solid-svg-icons/faJedi";
import {
  Box,
  Heading,
  Indent,
  Row,
  SeparatorLine,
  Space,
  Text,
} from "@stenajs-webui/core";
import { cssColor } from "@stenajs-webui/theme";
import * as React from "react";
import { stenaTimes } from "../../../icons/ui/IconsUi";
import { FlatButton } from "../buttons/FlatButton";
import { SecondaryButton } from "../buttons/SecondaryButton";
import { Icon } from "../icon/Icon";
import { Tag } from "../tag/Tag";
import { Card } from "./Card";
import { CardBody } from "./CardBody";
import { CardHeader } from "./CardHeader";
import { Story } from "@storybook/react";

export default {
  title: "elements/Card",
  component: Card,
  subcomponents: { CardHeader },
  parameters: {
    backgrounds: { default: "facebook" },
  },
  decorators: [
    (TheStory: Story) => (
      <div style={{ width: "500px" }}>
        <TheStory />
      </div>
    ),
  ],
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
            <FlatButton leftIcon={stenaTimes} />
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
        contentRight={<FlatButton leftIcon={stenaTimes} />}
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
        contentRight={<FlatButton leftIcon={stenaTimes} />}
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
        contentRight={<FlatButton leftIcon={stenaTimes} />}
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

export const HeadingLevel = () => {
  return (
    <Box gap={2}>
      <Card>
        <CardHeader text={"Heading level 2"} headingLevel={"h2"} />
        <CardBody gap={2}>
          <Text>
            This card header has the same styling as the other, but it is
            displayed as an h2 in the DOM.
          </Text>
          <Text>
            A screen reader would acknowledge this as heading level 2.
          </Text>
        </CardBody>
      </Card>
      <Card>
        <CardHeader text={"Heading level 3"} headingLevel={"h3"} />
        <CardBody gap={2}>
          <Text>
            This card header has the same styling as the other, but it is
            displayed as an h3 in the DOM.
          </Text>
          <Text>
            A screen reader would acknowledge this as heading level 3.
          </Text>
        </CardBody>
      </Card>
    </Box>
  );
};
