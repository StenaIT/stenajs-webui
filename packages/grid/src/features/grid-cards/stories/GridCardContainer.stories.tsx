import * as React from "react";
import { Heading, SeparatorLine, Space, Text } from "@stenajs-webui/core";
import { Card, CardBody, CardHeader, FlatButton } from "@stenajs-webui/elements";
import { GridCardContainer } from "../components/GridCardContainer";
import { faJedi } from "@fortawesome/free-solid-svg-icons";
import styles from "../components/GridCardContainer.module.css"

export default {
  title: "grid/CardsContainer",
};

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

const renderCardSpanTwo = (header: string, text: string) => <div className={styles.gridSpanTwo}>
  <Card>
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
</div>

export const CardsCompact = () => {
  return <GridCardContainer>
    {renderCard("This is the 1th card", "it's an awesome card indeed.")}
    {renderCard("This is the 2nd card", "Look at this awesome text!")}
    {renderCard("This is the 3rd card", "Woop woop.")}
    {renderCard("This is the 4th card", "~Cheerioooos!")}
    {renderCard("This is the 5th card", "Party party mode activated.")}
  </GridCardContainer>;
};

export const CardsMixed = () => {
  return <GridCardContainer>
    {renderCardSpanTwo("This is the 1th card", "I'm set to cover 2 columns if possible")}
    {renderCardSpanTwo("This is the 2nd card", "I'm also set to cover 2 columns!")}
    {renderCard("This is the 3rd card", "Woop woop.")}
    {renderCard("This is the 4th card", "~Cheerioooos!")}
    {renderCard("This is the 5th card", "Party party mode activated.")}
  </GridCardContainer>;
};
