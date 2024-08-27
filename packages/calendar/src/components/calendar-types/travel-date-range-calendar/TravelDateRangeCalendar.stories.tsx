import { StoryFn } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { TravelDateRangeCalendar } from "./TravelDateRangeCalendar";
import { Column, Heading, Row, Spacing } from "@stenajs-webui/core";
import { Banner, Label } from "@stenajs-webui/elements";
import { TravelDateRangeInputValue } from "../../../features/travel-calendar/types";
import { parseLocalizedDateString } from "../../../features/localize-date-format/LocalizedDateParser";
import { isToday } from "date-fns";

export default {
  title: "calendar/Calendar/TravelDateRangeCalendar",
  component: TravelDateRangeCalendar,
  decorators: [
    (TheStory: StoryFn) => (
      <div style={{ marginBottom: "400px" }}>
        <TheStory />
      </div>
    ),
  ],
};

export const Standard = () => {
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined
  );

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateRangeCalendar
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
      />
    </div>
  );
};

export const WithHeading = () => {
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined
  );

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateRangeCalendar
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        heading={"Select dates"}
      />
    </div>
  );
};

export const WithTestId = () => {
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined
  );
  const testId = (date: Date) => {
    if (isToday(date)) {
      return "today";
    }
    return undefined;
  };

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateRangeCalendar
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        dateTestId={testId}
      />
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
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined
  );

  return (
    <Column gap={2}>
      <Row>
        <Banner headerText={"Locale: " + localeCode} variant={"info"} />
      </Row>
      <Row>
        <TravelDateRangeCalendar
          value={value}
          onValueChange={setValue}
          localeCode={localeCode}
        />
      </Row>
    </Column>
  );
};

export const Sizes = () => {
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined
  );

  return (
    <Column gap={4} indent={4}>
      {(["small", "medium", "large"] as const).map((size) => (
        <Column gap={2}>
          <Heading>{size}</Heading>
          <Row>
            <TravelDateRangeCalendar
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

  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined
  );

  const setValueHandler = (value: TravelDateRangeInputValue) => {
    setValue(value);
    if (value.startDate) {
      setStartDate(parseLocalizedDateString(value.startDate, "sv"));
    }
    if (value.endDate) {
      setEndDate(parseLocalizedDateString(value.endDate, "sv"));
    }
  };

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateRangeCalendar
        value={value}
        onValueChange={setValueHandler}
        localeCode={"sv"}
        heading={"Select dates"}
      />
      <Spacing num={2} />
      <Row gap={4}>
        <Label text={"Start date"}>{startDate?.toDateString() ?? "-"}</Label>
        <Label text={"End date"}>{endDate?.toDateString() ?? "-"}</Label>
      </Row>
    </div>
  );
};
