import * as React from "react";
import { Heading, SeparatorLine, Space, Text } from "@stenajs-webui/core";
import {
  Card,
  CardBody,
  CardHeader,
  FlatButton,
} from "@stenajs-webui/elements";
import { GridCardContainer } from "../components/GridCardContainer";
import { faJedi } from "@fortawesome/free-solid-svg-icons";
import styles from "../components/GridCardContainer.module.css";

export default {
  title: "grid/CardsContainer",
};

const renderCard = (header: string, text: string, className?: string) => (
  <Card className={className}>
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
);

export const CardsCompact = () => {
  return (
    <GridCardContainer>
      {renderCard("This is the 1th card", "it's an awesome card indeed.")}
      {renderCard("This is the 2nd card", "Look at this awesome text!")}
      {renderCard("This is the 3rd card", "Woop woop.")}
      {renderCard("This is the 4th card", "~Cheerioooos!")}
      {renderCard("This is the 5th card", "Party party mode activated.")}
    </GridCardContainer>
  );
};

export const CardsMixed = () => {
  return (
    <GridCardContainer>
      {renderCard(
        "This is the 1th card",
        "I'm set to cover 2 columns if possible",
        styles.gridSpanTwo
      )}
      {renderCard(
        "This is the 2nd card",
        "I'm also set to cover 2 columns!",
        styles.gridSpanTwo
      )}
      {renderCard("This is the 3rd card", "Woop woop.")}
      {renderCard("This is the 4th card", "~Cheerioooos!")}
      {renderCard("This is the 5th card", "Party party mode activated.")}
    </GridCardContainer>
  );
};

export const CardsThree = () => {
  return (
    <GridCardContainer nrOfColumns={3}>
      {renderCard("This is the 1th card", "Weep")}
      {renderCard("This is the 2nd card", "Woop")}
      {renderCard("This is the 3rd card", "Woop woop.")}
      {renderCard("This is the 4th card", "~Cheerioooos!")}
      {renderCard("This is the 5th card", "Party party mode activated.")}
    </GridCardContainer>
  );
};

export const CardsFour = () => {
  return (
    <GridCardContainer nrOfColumns={4}>
      {renderCard("This is the 1th card", "Woop")}
      {renderCard("This is the 2nd card", "Weep")}
      {renderCard("This is the 3rd card", "Woop woop.")}
      {renderCard("This is the 4th card", "~Cheerioooos!")}
      {renderCard("This is the 5th card", "Party party mode activated.")}
    </GridCardContainer>
  );
};
