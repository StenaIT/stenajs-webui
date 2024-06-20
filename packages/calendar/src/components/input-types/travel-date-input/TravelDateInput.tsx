import * as React from "react";
import { Column, Heading, Row } from "@stenajs-webui/core";
import { LabelledTextInput } from "@stenajs-webui/forms";

export interface TravelDateInputProps {}

export const TravelDateInput: React.FC<TravelDateInputProps> = () => {
  return (
    <Column>
      <Heading>Select dates</Heading>
      <Row>
        <LabelledTextInput label={"To"} borderRadiusVariant={"onlyLeft"} />
        <LabelledTextInput label={"From"} borderRadiusVariant={"onlyRight"} />
      </Row>
    </Column>
  );
};
