import { StoryFn } from "@storybook/react";
import { StepIndicatorItem } from "./StepIndicatorItem";
import { StepIndicatorList, StepIndicatorListProps } from "./StepIndicatorList";
import * as React from "react";

export default {
  title: "elements/StepIndicatorList",
  component: StepIndicatorList,
};

export const Desktop: StoryFn<StepIndicatorListProps> = () => (
  <StepIndicatorList>
    <StepIndicatorItem
      id={"1"}
      stepHeader={"Passengers"}
      screenReaderCurrentStepText={"Current:"}
      screenReaderPassedStepText={"Completed:"}
      status={"passed"}
    />
    <StepIndicatorItem
      id={"2"}
      stepHeader={"Departures"}
      screenReaderCurrentStepText={"Current:"}
      screenReaderPassedStepText={"Completed:"}
      status={"current"}
    />
    <StepIndicatorItem
      id={"3"}
      stepHeader={"Add-ons"}
      screenReaderCurrentStepText={"Current:"}
      screenReaderPassedStepText={"Completed:"}
    />
  </StepIndicatorList>
);

export const Mobile: StoryFn<StepIndicatorListProps> = () => (
  <StepIndicatorList>
    <StepIndicatorItem
      id={"1"}
      stepHeader={"Passengers"}
      screenReaderCurrentStepText={"Current:"}
      screenReaderPassedStepText={"Completed:"}
      status={"passed"}
    />
    <StepIndicatorItem
      id={"2"}
      stepHeader={"Departures"}
      screenReaderCurrentStepText={"Current:"}
      screenReaderPassedStepText={"Completed:"}
      status={"current"}
    />
    <StepIndicatorItem
      id={"3"}
      stepHeader={"Add-ons"}
      screenReaderCurrentStepText={"Current:"}
      screenReaderPassedStepText={"Completed:"}
    />
  </StepIndicatorList>
);

Mobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};
