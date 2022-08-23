import * as React from "react";
import { Heading, SeparatorLine, Space, Text } from "@stenajs-webui/core";
import { Card, CardBody, CardHeader, FlatButton } from "@stenajs-webui/elements";
import { GridCardContainer } from "../components/GridCardContainer";
import { faJedi } from "@fortawesome/free-solid-svg-icons";

export default {
  title: "grid/Cards",
};

export const Overview = () => {

  const renderCard = (header: string, text: string) => <Card>
    <CardHeader
      leftIcon={faJedi}
      variant={"compact"}
      text={"Overview"}
      contentRight={<FlatButton label={"Create"} />}
    />
    <CardBody variant={"compact"}>
      <Heading variant={"h5"}>{header}</Heading>
      <Space />
      <Text>{text}</Text>
    </CardBody>
    <SeparatorLine />
    <CardBody variant={"compact"}>
      <Text>---</Text>
    </CardBody>
  </Card>

  return <GridCardContainer>
    {renderCard("This is the 1th card", "it's an awesome card indeed.")}
    {renderCard("This is the 2nd card", "Look at this awesome text!")}
    {renderCard("This is the 3rd card", "Woop woop.")}
    {renderCard("This is the 4th card", "~Cheerioooos!")}
    {renderCard("This is the 5th card", "Party party mode activated.")}
    <div>aaaaaaaaaaaaaa</div>
  </GridCardContainer>;
};
