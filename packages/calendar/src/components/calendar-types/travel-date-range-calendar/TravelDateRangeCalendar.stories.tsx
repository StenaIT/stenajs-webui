import { StoryFn } from "@storybook/react";
import * as React from "react";
import { useState } from "react";
import { TravelDateRangeCalendar } from "./TravelDateRangeCalendar";
import { Column, Heading, Row, Spacing } from "@stenajs-webui/core";
import { Banner, Label } from "@stenajs-webui/elements";
import { TravelDateRangeInputValue } from "../../../features/travel-calendar/types";
import { parseLocalizedDateString } from "../../../features/localize-date-format/LocalizedDateParser";
import { isToday } from "date-fns";
import { SupportedLocaleCode } from "../../../features/localize-date-format/LocaleMapper";

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
    undefined,
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
    undefined,
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

export const WithLabelledInput = () => {
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined,
  );

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateRangeCalendar
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        heading={"Select dates"}
        textInputVariant={"labelled"}
      />
    </div>
  );
};

export const WithTestIds = () => {
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined,
  );
  const testId = (date: Date) => {
    if (isToday(date)) {
      return "today";
    }
    return undefined;
  };

  const previousMonthButtonTestId = "prev-month-button";
  const nextMonthButtonTestId = "next-month-button";

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateRangeCalendar
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        dateTestId={testId}
        previousMonthButtonTestId={previousMonthButtonTestId}
        nextMonthButtonTestId={nextMonthButtonTestId}
      />
    </div>
  );
};

export const Locales = () => {
  const locales: Array<SupportedLocaleCode> = [
    "en-US",
    "en-GB",
    "en-IE",
    "de-AT",
    "nl-BE",
    "nl-NL",
    "de-DE",
    "nb-NO",
    "sv-SE",
    "da-DK",
    "lv-LV",
    "lt-LT",
    "it-IT",
    "et-EE",
    "fi-FI",
    "cs-CZ",
    "es-ES",
    "fr-FR",
    "pl-PL",
  ];

  return (
    <Column gap={4}>
      {locales.map((locale) => (
        <LocaleDemo localeCode={locale} />
      ))}
    </Column>
  );
};

const LocaleDemo = ({ localeCode }: { localeCode: SupportedLocaleCode }) => {
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined,
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
    undefined,
  );

  return (
    <Row gap={4}>
      {(["standard", "labelled"] as const).map((variant) => (
        <Column gap={4} indent={4}>
          <Heading>{variant}</Heading>
          {(["small", "medium", "large"] as const).map((size) => (
            <Column gap={2}>
              <Heading>{size}</Heading>
              <Row>
                <TravelDateRangeCalendar
                  value={value}
                  onValueChange={setValue}
                  localeCode={"sv"}
                  size={size}
                  textInputVariant={variant}
                />
              </Row>
            </Column>
          ))}
        </Column>
      ))}
    </Row>
  );
};

export const ParseDate = () => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);

  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined,
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

export const WithBlurPlaceholders = () => {
  const [value, setValue] = useState<TravelDateRangeInputValue | undefined>(
    undefined,
  );

  return (
    <div style={{ display: "inline-block" }}>
      <TravelDateRangeCalendar
        value={value}
        onValueChange={setValue}
        localeCode={"sv"}
        placeholderWhenBlurredStartDate={"Gimme start"}
        placeholderWhenBlurredEndDate={"Gimme end"}
      />
    </div>
  );
};
