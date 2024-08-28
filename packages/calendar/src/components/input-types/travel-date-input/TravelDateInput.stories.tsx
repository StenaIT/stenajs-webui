import { StoryFn } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { TravelDateInput } from "./TravelDateInput";
import { Column, Heading, Row, Spacing } from "@stenajs-webui/core";
import {
  Banner,
  Label,
  PrimaryButton,
  SecondaryButton,
} from "@stenajs-webui/elements";
import { parseLocalizedDateString } from "../../../features/localize-date-format/LocalizedDateParser";
import { formatLocalizedDate } from "../../../features/localize-date-format/LocalizedDateFormatter";
import { addDays, isToday } from "date-fns";

export default {
  title: "calendar/Input/TravelDateInput",
  component: TravelDateInput,
  decorators: [
    (TheStory: StoryFn) => (
      <div style={{ marginBottom: "400px" }}>
        <TheStory />
      </div>
    ),
  ],
};

export const Standard = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div style={{ display: "inline-block", padding: "150px 80px" }}>
      <TravelDateInput
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
      />
    </div>
  );
};

export const WithHeading = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div style={{ display: "inline-block", padding: "150px 80px" }}>
      <TravelDateInput
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        heading={"Select date"}
      />
    </div>
  );
};

export const WithTestId = () => {
  const [value, setValue] = useState<string>("");

  const testId = (date: Date) => {
    if (isToday(date)) {
      return "today";
    }
    return undefined;
  };

  return (
    <div style={{ display: "inline-block", padding: "150px 80px" }}>
      <TravelDateInput
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        dateTestId={testId}
      />
    </div>
  );
};

export const Sizes = () => {
  const [value, setValue] = useState<string>("");

  return (
    <Column gap={4} indent={4}>
      {(["small", "medium", "large"] as const).map((size) => (
        <Column gap={2}>
          <Heading>{size}</Heading>
          <Row>
            <TravelDateInput
              value={value}
              onValueChange={setValue}
              localeCode={"sv"}
              size={size}
            />
          </Row>
        </Column>
      ))}
    </Column>
  );
};

export const ParseDate = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [value, setValue] = useState<string>("");

  const setValueHandler = (value: string) => {
    setValue(value);
    if (value) {
      setStartDate(parseLocalizedDateString(value, "sv"));
    }
    if (value) {
      setEndDate(parseLocalizedDateString(value, "sv"));
    }
  };

  return (
    <div style={{ display: "inline-block", padding: "150px 80px" }}>
      <TravelDateInput
        value={value}
        onValueChange={setValueHandler}
        localeCode={"sv"}
        heading={"Select date"}
      />
      <Spacing num={4} />
      <Row gap={4}>
        <Label text={"Start date"}>{startDate?.toDateString() ?? "-"}</Label>
        <Label text={"End date"}>{endDate?.toDateString() ?? "-"}</Label>
      </Row>
    </div>
  );
};

export const Locales = () => {
  const locales = [
    "sv",
    "da",
    "en-GB",
    "pl",
    "nl",
    "en-US",
    "de-AT",
    "de-DE",
    "fr",
    "de",
    "es",
    "nb",
  ];

  return (
    <Column gap={4}>
      {locales.map((locale) => (
        <LocaleDemo localeCode={locale} />
      ))}
    </Column>
  );
};

const LocaleDemo = ({ localeCode }: { localeCode: string }) => {
  const [value, setValue] = useState<string>("");

  return (
    <Column gap={2} indent={5}>
      <Row>
        <Banner headerText={"Locale: " + localeCode} variant={"info"} />
      </Row>
      <Row>
        <TravelDateInput
          value={value}
          onValueChange={setValue}
          localeCode={localeCode}
          heading={"Select date"}
        />
      </Row>
    </Column>
  );
};

export const WithValidationAndCloseButton = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div style={{ display: "inline-block", padding: "150px 80px" }}>
      <TravelDateInput
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        heading={"Select date"}
        renderBelowCalendar={({ hideCalendar }) => {
          return (
            <Column gap={2}>
              <Banner variant={"error"} text={"Your dates are not good."} />
              <PrimaryButton label={"Close"} onClick={hideCalendar} />
            </Column>
          );
        }}
      />
    </div>
  );
};

export const WithPresets = () => {
  const [value, setValue] = useState<string>("");

  return (
    <div style={{ display: "inline-block", padding: "150px 80px" }}>
      <TravelDateInput
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        heading={"Select date"}
        renderBelowCalendar={() => {
          return (
            <Column gap={2}>
              <SecondaryButton
                label={"Tomorrow"}
                onClick={() =>
                  setValue(formatLocalizedDate(addDays(new Date(), 1), "sv"))
                }
              />
              <SecondaryButton
                label={"In a week"}
                onClick={() =>
                  setValue(formatLocalizedDate(addDays(new Date(), 7), "sv"))
                }
              />
            </Column>
          );
        }}
      />
    </div>
  );
};
