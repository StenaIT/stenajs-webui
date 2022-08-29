import * as React from "react";
import { Heading, SeparatorLine, Space, Text } from "@stenajs-webui/core";
import {
  Card,
  CardBody,
  CardHeader,
  FlatButton,
} from "@stenajs-webui/elements";
import { GridContainer } from "../components/GridContainer";
import { faJedi } from "@fortawesome/free-solid-svg-icons";
import styles from "../components/GridContainer.module.css";

export default {
  title: "grid/GridContainer",
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
    <GridContainer>
      {renderCard("This is the 1th card", "it's an awesome card indeed.")}
      {renderCard("This is the 2nd card", "Look at this awesome text!")}
      {renderCard("This is the 3rd card", "Woop woop.")}
      {renderCard("This is the 4th card", "~Cheerioooos!")}
      {renderCard("This is the 5th card", "Party party mode activated.")}
    </GridContainer>
  );
};

export const CardsMixed = () => {
  return (
    <GridContainer>
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
    </GridContainer>
  );
};

export const CardsThree = () => {
  return (
    <GridContainer nrOfColumns={3}>
      {renderCard("This is the 1th card", "Weep")}
      {renderCard("This is the 2nd card", "Woop")}
      {renderCard("This is the 3rd card", "Woop woop.")}
      {renderCard("This is the 4th card", "~Cheerioooos!")}
      {renderCard("This is the 5th card", "Party party mode activated.")}
    </GridContainer>
  );
};

export const CardsFour = () => {
  return (
    <GridContainer nrOfColumns={4}>
      {renderCard("This is the 1th card", "Woop")}
      {renderCard("This is the 2nd card", "Weep")}
      {renderCard("This is the 3rd card", "Woop woop.")}
      {renderCard("This is the 4th card", "~Cheerioooos!")}
      {renderCard("This is the 5th card", "Party party mode activated.")}
    </GridContainer>
  );
};

export const MixedContent = () => {
  return (
    <GridContainer nrOfColumns={2}>
      {renderCard("This is a card", "Woop")}
      <label>This supports text as well</label>
      <label>This is text</label>
      <p>Here's some more text</p>
    </GridContainer>
  );
};
