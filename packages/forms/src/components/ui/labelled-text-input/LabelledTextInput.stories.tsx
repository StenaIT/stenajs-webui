import * as React from "react";
import { LabelledTextInput } from "./LabelledTextInput";
import { Column, Heading, Row } from "@stenajs-webui/core";

export default {
  title: "forms/LabelledTextInput",
  component: LabelledTextInput,
};

export const Demo = () => (
  <Column gap={2}>
    <Heading>Medium</Heading>
    <LabelledTextInput
      label={"Input field"}
      placeholder={"Input field"}
      size={"medium"}
      id={"testmedium"}
    />
    <Heading>Large</Heading>
    <LabelledTextInput
      label={"Input field"}
      placeholder={"Input field"}
      size={"large"}
      id={"testlarge"}
    />
    <Heading>Error</Heading>
    <LabelledTextInput
      label={"Input field"}
      placeholder={"Input field"}
      variant={"error"}
      id={"testlarge"}
    />
    <Heading>Combined vertical</Heading>
    <Row>
      <Column>
        <LabelledTextInput
          id={"testto"}
          label={"To"}
          borderRadiusVariant={"onlyTop"}
        />
        <LabelledTextInput
          id={"testfrom"}
          label={"From"}
          borderRadiusVariant={"onlyBottom"}
        />
      </Column>
    </Row>
    <Heading>Combined horizontal</Heading>
    <Row>
      <LabelledTextInput label={"To"} borderRadiusVariant={"onlyLeft"} />
      <LabelledTextInput label={"From"} borderRadiusVariant={"onlyRight"} />
    </Row>
  </Column>
);

export const Mobile = () => (
  <Column gap={2}>
    <Heading>Medium</Heading>
    <LabelledTextInput
      label={"Input field"}
      placeholder={"Input field"}
      size={"medium"}
      id={"testmedium"}
    />
    <Heading>Large</Heading>
    <LabelledTextInput
      label={"Input field"}
      placeholder={"Input field"}
      size={"large"}
      id={"testlarge"}
    />
    <Heading>Error</Heading>
    <LabelledTextInput
      label={"Input field"}
      placeholder={"Input field"}
      variant={"error"}
      id={"testlarge"}
    />
    <Heading>Combined</Heading>
    <Column>
      <LabelledTextInput
        id={"testto"}
        label={"To"}
        borderRadiusVariant={"onlyTop"}
      />
      <LabelledTextInput
        id={"testfrom"}
        label={"From"}
        borderRadiusVariant={"onlyBottom"}
      />
    </Column>
  </Column>
);

Mobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};
